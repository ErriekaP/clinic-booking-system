//import { Col, Form, Row, Stack } from "react-bootstrap";
import { Flex, Text, Button, TextField, Grid } from '@radix-ui/themes';

export function NoteForm() {
  return (
   <Grid columns="3" gap="3" width="auto">
    <TextField.Input variant = "classic" size="3" placeholder="School ID" ></TextField.Input>
    <TextField.Input variant = "classic" size="3" placeholder="FirstName" ></TextField.Input>
    <TextField.Input variant = "classic" size="3" placeholder="LastName" ></TextField.Input>
   </Grid>
  );
}
