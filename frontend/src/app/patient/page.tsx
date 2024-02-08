"use client";
import * as Label from '@radix-ui/react-label';
import './styles.css';

import { Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";

export default function Page(){
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-4 ">
            <Container>
                <Flex display="flex" direction="column" align="center" justify="center">
                    <Heading>
                        <Text>Info</Text>
                    </Heading>
                </Flex>
                <Flex>
                    <Card className="CardsContent" >

                        <p className="Text">Basic Details</p>

                        <Flex direction="row" gap="3" >
                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="firstname">
                            FirstName
                        </label>
                        <input className="Input" id="firstname" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="middlename">
                            MiddleName
                        </label>
                        <input className="Input" id="middlename" />
                        </fieldset>

                        <fieldset className="Fieldset">
                        <label className="Label" htmlFor="lastname">
                            LastName
                        </label>
                        <input className="Input" id="lastname" />
                        </fieldset>
                        </Flex>

                        <Flex>
                            
                        </Flex>
                      
                        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                        </div>
                        
                    </Card>
                </Flex>
            </Container>
        </main>
    )
}