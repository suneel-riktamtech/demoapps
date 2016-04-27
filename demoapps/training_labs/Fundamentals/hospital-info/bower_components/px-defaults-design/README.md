# Defaults

The Predix Experience `defaults` module contains a few variables and settings that are **required** for using any of the rest of the framework.

## Sass Documentation

You can review Sass Documentation here: https://github.build.ge.com/pages/PXd/px-defaults-design/sassdoc

## Dependency

Px's Defaults module depends on one other Px module:

* [px-functions-design](https://github.build.ge.com/PXd/px-functions-design)

## Installation

Install this module and its dependency using bower:

    bower install --save https://github.build.ge.com/PXd/px-defaults-design.git

Once installed, `@import` into your project's Sass file in its Settings layer:

    @import "px-defaults-design/_settings.defaults.scss";