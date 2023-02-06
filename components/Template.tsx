"use client";

import { Button } from "@fluid-design/fluid-ui";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-semibold text-zinc-700 dark:text-zinc-300 text-lg uppercase">
      {children}
    </h1>
  );
};

export const Template = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <Heading>Button</Heading>
      <div className="flex gap-4 flex-wrap">
        <Button color="rose" weight="light" label="Light" />
        <Button color="rose" weight="normal" label="Normal" />
        <Button color="rose" weight="bold">
          Bold
        </Button>
        <Button color="rose" weight="outline">
          Outline
        </Button>
        <Button color="rose" weight="clear">
          Clear
        </Button>
        <Button color="rose" weight="link">
          Link
        </Button>
      </div>
    </div>
  );
};
