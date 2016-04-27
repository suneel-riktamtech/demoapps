'use strict';

var exec = require('child_process').exec;

module.exports = {

    dependencyChoicesCss: [
        {name: "Buttons", value: {bowerDev: "\"px-meta-buttons-design\": \"https://github.build.ge.com/PXd/px-meta-buttons-design.git#~0.4.0\","}},
        {name: "Lists", value: {bowerDev: "\"px-meta-lists-design\": \"https://github.build.ge.com/PXd/px-meta-lists-design.git#~0.2.0\","}},
        {name: "Forms", value: {bowerDev: "\"px-forms-design\": \"https://github.build.ge.com/PXd/px-forms-design.git#~0.3.0\","}},
        {name: "Headings", value: {bowerDev: "\"px-headings-design\": \"https://github.build.ge.com/PXd/px-headings-design.git#~0.2.0\","}},
        {name: "Tables", value: {bowerDev: "\"px-tables-design\": \"https://github.build.ge.com/PXd/px-tables-design.git#~0.3.0\","}}       
    ],

    dependencyChoicesTest: [
        //{name: 'wct', value: {bowerDev: "\"web-component-tester\": \"~2.2.6\""}}
    ],

    resolveDependencies: function resolveDependencies(dependencies, type) {
        var resolved = [], i, dep;
        if (dependencies) {
            for (i = 0; i < dependencies.length; i++) {
                dep = dependencies[i].value || dependencies[i];
                if (dep[type]) {
                    resolved.push(dep[type]);
                }
            }
        }
        return resolved;
    },

    verifyGlobalPackage: function(pkgName, version, link) {
        var resolvedPkgName = version ? pkgName + "@" + version : pkgName;
        console.log("Verifying " + resolvedPkgName + "...");
        exec('npm list -g ' + resolvedPkgName + ' --depth=0', function(err, stdout, stderr) {
            console.log(stdout);
            if (stdout.indexOf("(empty)") !== -1) {
                console.log("Installing " + resolvedPkgName + "...");
                exec('npm install -g ' + resolvedPkgName, function(err, stdout, stderr) {
                    console.log(stdout);
                    if (link) {
                        exec('npm link ' + pkgName, function(err, stdout, stderr) {
                            console.log(stdout);
                        });
                    }
                });
            }
            else {
                if (link) {
                    exec('npm link ' + pkgName, function(err, stdout, stderr) {
                        console.log(stdout);
                    });
                }
            }
        });
    }
};
