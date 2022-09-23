import React from 'react';
import { ISectionBase } from 'shared/interfaces';

export default function CLIContent(props: {selectedSectionContents: ISectionBase[]}) {
    const { selectedSectionContents } = props;

    return (
        <>
            {selectedSectionContents.length > 0 && (
                <pre className="console">
                    {selectedSectionContents.map((content: ISectionBase) => (
                        <div key={content.name}>
                            {content.azureCLICommand && (
                                <div className="azure-cli-command">
                                    <span className="comment"># {content.name}</span>
                                    <br />
                                    {content.azureCLICommand.join('\n')}
                                </div>
                            )}
                            {!content.azureCLICommand && (
                                <span className="comment"></span>
                            )}
                        </div>
                    ))}
                </pre>
            )}
            {!selectedSectionContents.length && (
                <div>No services selected</div>
            )}
        </>
    );
}