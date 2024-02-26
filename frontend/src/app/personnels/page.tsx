"use client";
import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import "./styles.css";
import {
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Inset,
  Strong,
  Text,
  TextField,
} from "@radix-ui/themes";
import { SetStateAction, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  interface Personnel {
    id: number;
    firstName: string;
    lastName: string;
  }

  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(
    null
  );

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCardClick = (personnel: Personnel) => {
    setSelectedPersonnel(personnel);
    setIsOpen(true);
  };

  const handleView = (personnel: Personnel) => {
    router.push(`/patients/view/${personnel.id}`);
    console.log("Viewing personnel:", personnel);
  };

  const handleEdit = (personnel: Personnel) => {
    router.push(`/patients/update/${personnel.id}`);
    console.log("Editing personnel:", personnel);
  };

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/personnel`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Personnel");
        }
        const data = await response.json();
        setPersonnel(data);
      } catch (error) {
        console.error("Error fetching Personnel:", error);
      }
    };
    fetchPersonnel();
  }, []); // Fetch patients on component mount

  // Function to handle search query change
  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Filter patients based on search query
  const filteredPersonnel = personnel.filter(
    (personnel) =>
      personnel.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      personnel.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      personnel.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <Container>
          <div className="mb-10">
            <Flex
              display="flex"
              direction="row"
              align="center"
              justify="center"
            >
              <TextField.Root>
                <TextField.Slot>
                  <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
                <TextField.Input
                  placeholder="Search personnel..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </TextField.Root>
            </Flex>
          </div>

          <Flex
            display="flex"
            direction="row"
            align="center"
            justify="center"
            gap="3"
          >
            <Grid columns="5" gap="5" width="auto">
              {filteredPersonnel.map((personnel) => (
                <div key={personnel.id}>
                  <Card
                    className="Card"
                    onClick={() => handleCardClick(personnel)}
                  >
                    {" "}
                    <Inset clip="padding-box" side="top" pb="current">
                      <img
                        src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                        alt="Bold typography"
                        className="Image"
                      />
                    </Inset>
                    <Text as="p" align="center" className="Text">
                      <Strong>
                        {personnel.id} {personnel.firstName}{" "}
                        {personnel.lastName}
                      </Strong>
                    </Text>
                  </Card>
                </div>
              ))}
              {/* DialogBox */}
              <div className="CardContainer">
                <Dialog.Root open={isOpen}>
                  {" "}
                  <Dialog.Overlay className="DialogOverlay" />
                  <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">
                      {`${selectedPersonnel?.firstName}'s`} profile
                    </Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                      Do you want to View or Make changes to{" "}
                      {`${selectedPersonnel?.firstName}'s`} profile?
                    </Dialog.Description>

                    <div
                      style={{
                        display: "flex",
                        marginTop: 25,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Dialog.Close asChild>
                        <button
                          className="Button"
                          onClick={() =>
                            selectedPersonnel && handleView(selectedPersonnel)
                          }
                        >
                          View
                        </button>
                      </Dialog.Close>
                      <Dialog.Close asChild>
                        <button
                          className="Button"
                          onClick={() =>
                            selectedPersonnel && handleEdit(selectedPersonnel)
                          }
                        >
                          Edit
                        </button>
                      </Dialog.Close>
                    </div>
                    <Dialog.Close asChild>
                      <button
                        className="IconButton"
                        aria-label="Close"
                        onClick={handleClose}
                      >
                        <Cross2Icon />
                      </button>
                    </Dialog.Close>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </Grid>
          </Flex>
        </Container>
      </main>
    </>
  );
}
