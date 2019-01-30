#!/usr/bin/env python
# Based on Sam Keeley's MunkiPkginfoReceiptsEditor processor
# This processor sets all receipts as optional except the ones for a
# specified version of Adobe CC (e.g. CC18) and the ones required by all.
from FoundationPlist import readPlist, writePlist
from autopkglib import Processor, ProcessorError

__all__ = ["RGCCVersionMunkiPkginfoReceiptsEditor"]


class RGCCVersionMunkiPkginfoReceiptsEditor(Processor):
    '''Modifies the receipts key in a Munki pkginfo by setting everything
    except the Adobe CC specific version (incl. ones denoted as ALL)
    as optional. Based on Sam Keeley's MunkiPkgInfoReceiptsEditor processor.'''

    input_variables = {
        'pkginfo_repo_path': {
            'required': True,
            'description': 'The repo path where the pkginfo was written.',
        },
        'redgiant_cc_version_substring': {
            'required': True,
            'description': 'Adobe CC version as Red Giant notation (e.g CC18)',
        },
    }
    output_variables = {
    }

    description = __doc__

    def main(self):
        if len(self.env['pkginfo_repo_path']) < 1:
            self.output('empty pkginfo path')
            return

        pkginfo = readPlist(self.env['pkginfo_repo_path'])
        substrings = ['SA', 'postflight']
        substrings.append(self.env['redgiant_cc_version_substring'])
        receipts_modified = []
        if 'receipts' in pkginfo.keys():
            for i, receipt in enumerate(pkginfo['receipts']):
                # made optional any pkginfos
                if not any(substr in receipt['packageid'] for substr in
                           substrings):
                    pkginfo['receipts'][i]['optional'] = True
                    self.output(
                        'Setting package ID %s as optional' %
                        receipt['packageid'])
                    receipts_modified.append(receipt['packageid'])
        else:
            raise ProcessorError('pkginfo does not contain receipts key')

        if len(receipts_modified) > 0:
            self.output(
                'Writing pkginfo to %s' %
                self.env['pkginfo_repo_path'])
            writePlist(pkginfo, self.env['pkginfo_repo_path'])
        else:
            self.output('No receipts modified, not writing pkginfo')


if __name__ == '__main__':
    processor = RGCCVersionMunkiPkginfoReceiptsEditor()
    processor.execute_shell()
