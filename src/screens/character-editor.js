import React from 'react';
import { HeaderOptions } from '../components/header';
import { Page } from '../components/page';
import Section from '../components/section';
import { map, keys } from 'lodash-es';
import produce from 'immer';

import { CharacterCanvas } from '../components/lap-time-input';
import Characters from '../components/lap-time-input/characters';

export default class CharacterEditorScreen extends React.Component {
    state = {
        characters: { ...Characters },
    };

    handleCharacterChange = (key) => (character) => {
        this.setState(produce((state) => {
            state.characters[key] = character;
        }))
    }

    render() {
        const { characters } = this.state;

        return (
            <Page removeTopPadding>
                <HeaderOptions
                    title='Character Editor'
                    back={null}
                    right={null}
                />

                <textarea style={{fontFamily: 'monospace', height: '30em'}} onChange={() => {}} value={JSON.stringify(characters, null, 4)}></textarea>

                {map(characters, (character, key) => {
                    return key === ' ' ? null : (
                        <Section key={key}>
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        margin: '0',
                                        textAlign: 'right',
                                        fontFamily: 'monospace',
                                        fontSize: '4em',
                                    }}
                                >
                                    {key}
                                </div>
                                <div style={{ margin: '0', flex: '1' }}>
                                    <CharacterCanvas
                                        character={character}
                                        style={{ maxWidth: '10rem' }}
                                        onChange={this.handleCharacterChange(key)}
                                    />
                                </div>
                            </div>
                        </Section>
                    );
                })}
            </Page>
        );
    }
}
