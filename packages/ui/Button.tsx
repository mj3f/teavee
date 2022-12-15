import * as React from "react";

type Props = {
  children: any; // React.ReactNode;
}

export const Button = (props: Props) => {
  return <button>{props.children}</button>;
};
