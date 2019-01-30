#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# File: RSMBUpdaterDownloadURLProvider.py
# Author: Antti Pettinen <antti.pettinen@gmail.com>
# Last Modified Date: 06.12.2018
# Last Modified By: Antti Pettinen <antti.pettinen@gmail.com>
#
# Copyright 2018 SRG SSR
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
"""See docstring for RSMBUpdaterDownloadURLProvider class"""
import urllib2
import xml.etree.ElementTree as ET

from autopkglib import Processor, ProcessorError
from os.path import join as os_path_join

__all__ = ["RSMBUpdaterDownloadURLProvider"]

# osx or windows
OS_PLATFORM = "osx"
XML_URL = "https://revisionfx.com/updaters/RSMB6AEupdateinfo.xml"


class RSMBUpdaterDownloadURLProvider(Processor):
    """
    Provides a download URL for ReelSmartMotion Blur plugin, given the XML
    update URL.
    Supports both macOS and Windows
    """
    description = __doc__
    input_variables = {
        "updateinfo_xml_url": {
            "required": False,
            "description": ("URL to Updateinfo XML, Default is %s" % XML_URL),
        },
        "os_platform": {
            "required": False,
            "description": ("Use osx or windows, default is %s" % OS_PLATFORM),
        },
    }
    output_variables = {
        "url": {
            "description": "URL of the ReelSmartMotion Blur plugin",
        },
        "version": {
            "description": "Version of the ReelSmartMotion Blur plugin",
        },
    }

    def _get_XML_data(self):
        """
        Download the XML data from the provided URL. Returns a string
        """
        try:
            request = urllib2.Request(
                self.env.get('updateinfo_xml_url', XML_URL))
            xml_page = urllib2.urlopen(request).read()
        except (urllib2.HTTPError, ValueError) as err:
            raise ProcessorError(
                "Fetching xml page from %s resulted in error %e" %
                (self.env.get('support_page_url'), err))
        return xml_page

    def _parse_xml_data(self):
        """
        Parse the XML data string and return download URL and version
        """
        xml_root = ET.fromstring(self._get_XML_data())
        try:
            version = xml_root.find('version').text
            base_url = xml_root.find(
                './downloadLocationList/downloadLocation/url').text
            for platformfile in xml_root.findall(
                    './platformFileList/platformFile'):
                if platformfile.find('platform').text ==\
                   self.env.get('os_platform', OS_PLATFORM.lower()):
                    platformfilename = platformfile.find(
                        'filename').text
            return os_path_join(base_url, platformfilename), version
        except Exception as err:
            raise ProcessorError("Error occured when parsing XML: %s" % err)

    def main(self):
        """
        Find and return the download URL for ReelSmartMotion Blur plugin
        updater
        """
        self.env['url'], self.env['version'] = self._parse_xml_data()
        self.output("Download URL found: %s" % self.env['url'])
        self.output("Version found: %s" % self.env['version'])


if __name__ == "__main__":
    PROCESSOR = RSMBUpdaterDownloadURLProvider()
    PROCESSOR.execute_shell()
