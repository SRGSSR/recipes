#!/usr/bin/env python
#
# Copyright 2015 Rob percival
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


import re
import urllib2

from autopkglib import Processor, ProcessorError


__all__ = ["KyngChaosURLProvider"]


KYNGCHAOS_BASE_URL = "https://qgis.org/downloads/macOS/"

class KyngChaosURLProvider(Processor):
    description = "Provides URL to the latest KyngChaos downloads."
    input_variables = {
        "product_name": {
            "required": True,
            "description": 
                "Product to fetch URL for. One of 'qgis', 'gdal', 'numpy', 'matplolib.",
        },
        "version": {
            "required": False,
            "description": ("Which version to download. Examples: 'latest', "
                "'2.8.1-1', '1.11', '1.3.1-2'."),
        },
        "base_url": {
            "required": False,
            "description": "Default is '%s." % KYNGCHAOS_BASE_URL,
        },
    }
    output_variables = {
        "url": {
            "description": "URL to the latest KyngChaos download release.",
        },
    }
    
    __doc__ = description
    
    def get_kyngchaos_dmg_url(self, base_url, product_name, version):
        
        product_dir = ''
        
		# Expand product name to full product name (IE: gdal -> GDAL_Complete)
		# and get product directory from product type
        if product_name == 'qgis':
            product_dir = product_name
            product_name = product_name.upper()
        elif product_name == 'gdal':
            product_dir = 'frameworks'
            product_name = product_name.upper() + '_Complete'
        elif product_name == 'numpy':
            product_dir = 'python'
            product_name = 'NumPy'
        elif product_name == 'matplotlib':
            product_dir = 'python'
        
        else:
            raise ValueError('product name not recognized')
            
        if version == 'latest':
            version = self.get_latest_version(product_name, product_dir)
        
        filename = product_name + '-' + version + '.dmg'
        self.env["version"] = version
        
		# Construct download URL.
        dmg_url = "/".join((base_url, product_dir, filename))
        
        # Try to open download link.
        try:
            f = urllib2.urlopen(dmg_url)
            f.close()
        except BaseException as e:
            raise ProcessorError("Can't download %s: %s" % (dmg_url, e))
        
        # Return URL.
        return dmg_url
    
    def get_latest_version(self, product_name, product_dir):
    
        # Read HTML index.
        index_url = "http://www.kyngchaos.com/software/" + product_dir
        try:
            f = urllib2.urlopen(index_url)
            html = f.read()
            f.close()
        except BaseException as e:
            raise ProcessorError("Can't open %s: %s" % (index_url, e))
        
        # Create regex for finding newest version
        regex = re.escape(product_name) + r'-(?P<version>[^"]+)\.dmg"'
        re_dmg = re.compile(regex)
        
        # Search for newest version
        m = re_dmg.search(html)
        if not m:
            raise ProcessorError(
                "Couldn't find %s download URL in %s" 
                % (product_name, index_url))
        # Return version
        return m.group('version')
        
    
    def main(self):
        # Determine base_url, version, product_name.
        product_name = self.env["product_name"]
        version = self.env.get("version", "latest")
        base_url = self.env.get("base_url", KYNGCHAOS_BASE_URL)
        
        self.env["url"] = self.get_kyngchaos_dmg_url(base_url, product_name, version)
        self.output("Found URL %s" % self.env["url"])
    

if __name__ == "__main__":
    processor = KyngChaosURLProvider()
    processor.execute_shell()
