#!/usr/bin/python
#
# Antti Pettinen
# Copyright 2018 Apfelwerk GmbH & Co.KG
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""See docstring for AJADownloadURLProvider class"""
import urllib2

from autopkglib import Processor, ProcessorError
from HTMLParser import HTMLParser, HTMLParseError
from json import loads as json_loads
from os.path import join as os_path_join

__all__ = ["AJADownloadURLProvider"]

OS_PLATFORM = "macos"
PRODUCT_VERSION = "latest"


class AJADownloadURLProvider(Processor):
    """
    Provides a download URL  and the AJA provided description for the desired
    version of an AJA Software title.
    Supports macOS, Windows, CentOS, RedHat, Ubuntu.
    .
    """
    description = __doc__
    input_variables = {
        "support_page_url": {
            "required": True,
            "description": ("URL of AJA software support page"),
        },
        "os_platform": {
            "required": False,
            "description": ("Default is %s" % OS_PLATFORM),
        },
        "product_version": {
            "required": False,
            "description": ("Default is %s, define as vXX" % PRODUCT_VERSION),
        },
    }
    output_variables = {
        "url": {
            "description": "URL to the desired AJA software release",
        },
        "description": {
            "description": "AJA provided description of the release",
        },
    }

    def _get_json_data(self):
        """
        Extracts the JSON data out of the AJA support page, where it is
        embedded inside a Javascript variable. Returns a dict.
        """
        try:
            request = urllib2.Request(self.env.get('support_page_url'))
            html_page = urllib2.urlopen(request).read()
        except (urllib2.HTTPError, ValueError) as err:
            raise ProcessorError(
                "Fetching html page from %s resulted in error %e" %
                (self.env.get('support_page_url'), err))

        # Create new parser customized for our needs to extract the supportJSon
        class DataParser(HTMLParser):
            def __init__(self):
                HTMLParser.__init__(self)
                self.support_data = []

            def handle_data(self, data):
                if "supportJson" in data:
                    self.support_data.append(data)
        try:
            parser = DataParser()
            parser.feed(html_page.decode('utf-8'))
            # this should be  a list of length 1
            if not len(parser.support_data) == 1:
                raise ValueError("Support data not found or multiple support"
                                 "data present")
            # json is embedded as a string variable in the support_data, and
            # also contains some extra data at the end. Strip the actual data
            # and return it as a dictionary:
            return json_loads(
                parser.support_data[0].split('=', 1)[1].rsplit(';', 1)[0])
        except HTMLParseError as err:
            raise ProcessorError("Parsing data from page failed: %s" % err)
        except Exception as ex:
            raise ProcessorError("General parsing error %s" % ex)

    def _get_software_catalog(self, dl_info_json):
        """
        Select the correct software catalog based on desired version.
        Latest returns the current catalog (Software), otherwise the archive
        catalog is returned. Returns a list of catalogs (as dicts),
        in case there's many.
        """
        if self.env.get('product_version',
                        PRODUCT_VERSION).lower() == "latest":
            sw_catalog_title = "Software"
        else:
            sw_catalog_title = "Software Archive"

        return [sw_dict for sw_dict in dl_info_json['items'] if
                sw_dict['title'] == sw_catalog_title]

    def _parse_downloads(self, sw_catalog, sw_version=None):
        """
        Parse the download URL for desired software and OS type from the
        provided software catalog dictionary.
        sw_catalog: list of dictionaries
        os_type: [macos], linux, windows

        Returns a dictionary containing download link and
        description.
        """
        os_type = self.env.get('os_platform', OS_PLATFORM)
        if os_type.lower() == "macos":
            count_key = "mac_count"
            item_key = "m"
        elif os_type.lower() in ("centos", "redhat", "ubuntu"):
            count_key = "linux_count"
            item_key = "l"
        elif os_type.lower() == "windows":
            count_key = "pc_count"
            item_key = "p"
        else:
            raise ProcessorError("Unknown operating system type %s" % os_type)
        # downloads will be a list of tuple(urlpath, file, description)
        downloads = []
        for catalog in sw_catalog:
            # If there's no downloads available in this catalog, don't try
            # to parse further
            if catalog[count_key] > 0:
                gen = ((item_list["files"][0]["urlpath"],
                       item_list["files"][0]["file"],
                        item_list["description"])
                       for item_list in catalog["items"][item_key])
                try:
                    for dl_url in gen:
                        if os_type in dl_url[1].lower():
                            downloads.append(dl_url)
                # for funkier windows stuff included in some catalogs
                except IndexError:
                    pass
                except Exception:
                    raise ProcessorError("Error occured when parsing catalogs")

        if sw_version:
            for dl in downloads:
                # return the first matching version we found
                if sw_version in dl[1]:
                    return os_path_join(dl[0], dl[1]), dl[2]
            raise ProcessorError("Desired version not found. Check version!")
        # if we got here, we can assume we are looking for the latest version,
        # which should be the first one
        return os_path_join(downloads[0][0], downloads[0][1]), downloads[0][2]

    def main(self):
        """
        Find and return the download URL for a desired version of
        AJA Software products.
        """
        sw_catalog = self._get_software_catalog(self._get_json_data())
        if self.env.get('product_version', PRODUCT_VERSION) == 'latest':
            self.env['url'], self.env['description'] =\
                self._parse_downloads(sw_catalog)
        else:
            self.env['url'], self.env['description'] =\
                    self._parse_downloads(sw_catalog,
                                          self.env.get('product_version',
                                                       PRODUCT_VERSION))
        self.output("Download URL found: %s" % self.env['url'])
        self.output("Description found: %s" % self.env['description'])


if __name__ == "__main__":
    PROCESSOR = AJADownloadURLProvider()
    PROCESSOR.execute_shell()
