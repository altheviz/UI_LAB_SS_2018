require("application");
/* tslint:disable:no-string-literal */
if (!global["__snapshot"]) {
    /* tslint:enable:no-string-literal */
    // In case snapshot generation is enabled these modules will get into the bundle
    // but will not be required/evaluated.
    // The snapshot webpack plugin will add them to the tns-java-classes.js bundle file.
    // This way, they will be evaluated on app start as early as possible.
    require("ui/frame");
    require("ui/frame/activity");
}
