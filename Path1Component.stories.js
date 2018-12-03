/**
 *
 * This file was generated with Adobe XD React Exporter
 * Exporter for Adobe XD is written by: Johannes Pichler <j.pichler@webpixels.at>
 *
 **/

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Path1 from "./Path1Component";

export const myProps = {
  id: "1",
  className: "mySampleClass",
  sampleString: "Test Task",
  sampleDate: new Date(2018, 0, 1, 9, 0)
};

export const actions = {
  onActionOne: action("onActionOne"),
  onActionTwo: action("onActionTwo")
};

storiesOf("Path1", module)
  .add("default", () => <Path1 {...myProps} {...actions} />)
  .add("pinned", () => <Path1 {...myProps} pinned={true} {...actions} />)
  .add("archived", () => <Path1 {...myProps} archived={true} {...actions} />);
