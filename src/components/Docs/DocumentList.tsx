import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { servicesAtom } from 'atoms/servicesAtom';
import { ISectionBase } from 'shared/interfaces';
import TabPanel from 'shared/TabPanel';
import DocsContent from './DocsContent';
import LearnContent from './LearnContent';
import CLIContent from './CLIContent';

export default function DocumentList() {
    const [value, setValue] = useState(0);
    const selectedContents = useRecoilValue<ISectionBase[]>(servicesAtom);

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        setValue(newValue);
    }

    return (
        <>
            <div className="heading">Docs and Learn Content</div>
            <div className="container">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Docs" />
                        <Tab label="Microsoft Learn" />
                        <Tab label="Azure CLI" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <DocsContent selectedSectionContents={selectedContents} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <LearnContent selectedSectionContents={selectedContents} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CLIContent selectedSectionContents={selectedContents} />
                </TabPanel>
            </div>
        </>
    );
}