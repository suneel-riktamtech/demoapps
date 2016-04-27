# List Inline

The Predix Experience List Inline module simply displays a list as one horizontal row. This module is a fork of the [inuitcss list-inline module](https://github.com/inuitcss/objects.list-inline).

## Demo

You can review List Inline styles and recommended markup here: https://github.build.ge.com/pages/PXd/px-list-inline-design

## Sass Docs

You can review Sass Documentation here: https://github.build.ge.com/pages/PXd/px-list-inline-design/sassdoc

## Dependency

Px’s List Inline Module depends on one other Px module:

* [px-defaults-design](https://github.build.ge.com/PXd/px-defaults-design)

## Upstream dependency

The List Inline module is also an upstream dependency in this meta kit:

* [px-meta-lists-design](https://github.build.ge.com/PXd/px-meta-lists-design)

## Installation

Install this module and its dependencies using bower:

    bower install --save https://github.build.ge.com/PXd/px-list-inline-design.git

Once installed, `@import` into your project's Sass file in its Objects layer:

    @import "px-list-inline-design/_objects.list-inline.scss";

## Usage

These flags are available and, if needed, should be set to `true` prior to importing the module:

    $inuit-enable-list-inline--delimited

This variable can be customized:

    $inuit-list-inline-delimit-character

Basic usage of the List Inline module uses one required class:

    <ul class="list-inline">
        <li>Foo</li>
        <li>Bar</li>
        <li>Baz</li>
    </ul>

The only valid children of the `.list-inline` node are `<li>`s.

## Options

Another, optional, class can supplement the required base class:

* `.list-inline--delimited`: add a character to delimit list items.

For example:

    <ul class="list-inline list-inline--delimited">
        <li>Foo</li>
        <li>Bar</li>
        <li>Baz</li>
    </ul>
