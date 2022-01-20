import { useState, useCallback } from 'react';
import { Stack, Button, Collapsible, TextContainer } from '@shopify/polaris';

const Description = ({ text }) => {
  const [open, setOpen] = useState(false);
  const handleToggle = useCallback(() => setOpen((open) => !open), []);
  return (
    <Stack vertical>
      <Button
        onClick={handleToggle}
        ariaExpanded={open}
        ariaControls="basic-collapsible"
      >
        Description
      </Button>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{
          duration: '500ms',
          timingFunction: 'ease-in-out',
        }}
        expandOnPrint
      >
        <TextContainer>
          <p className="card-description">{text}</p>
        </TextContainer>
      </Collapsible>
    </Stack>
  );
};

export default Description;
