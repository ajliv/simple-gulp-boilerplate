var _ = require('lodash');
var url = require('url');
var proxy = require('proxy-middleware');

var PROJECT_NAME = 'Simple Gulp Boilerplate';
var DIST_DIR = './dist';
var SRC_DIR = './src';
var REMOTE_PATH = '/' + _.kebabCase(PROJECT_NAME);

var ftppass = null;
try {
    ftppass = require('./.ftppass');
} catch (e) { }

var proxyOptions = url.parse('http://www.adultswim.com/utilities');
    proxyOptions.route = '/utilities';

var copySrc = {};
    copySrc[SRC_DIR + '/media/**'] = DIST_DIR + '/media';



var CONFIG = {};

CONFIG.browserify = {
    // A separate bundle will be generated for each bundle config in the list below
    bundleConfigs: [{
        entries: SRC_DIR + '/scripts.js',
        dest: DIST_DIR,
        outputName: 'scripts.js',
        extensions: ['.ejs']
    }]
};

CONFIG.browserSync = {
    server: {
        middleware: [proxy(proxyOptions)],
        baseDir: DIST_DIR
    },
    port: 8080
};

CONFIG.copy = {
    src: copySrc
};

CONFIG.deploy = {
    src: (DIST_DIR + '/**'),
    dev: {},
    staging: {},
    production: {}
};

CONFIG.fonts = {
    src: [
        (SRC_DIR + '/fonts/**')
        //add paths to other libraries if you add them
    ],
    dest: (DIST_DIR + '/fonts')
};

CONFIG.images = {
    src: (SRC_DIR + '/images/**'),
    dest: (DIST_DIR + '/images')
};

CONFIG.less = {
    src: (SRC_DIR + '/styles.less'),
    watchSrc: (SRC_DIR + '/**/*.less'),
    dest: DIST_DIR,
    settings: {
        paths: [
            SRC_DIR + '/styles/',
            './node_modules/',
            './bower_components/'
        ]
    }
};

CONFIG.markup = {
    src: (SRC_DIR + '/*.html'),
    dest: DIST_DIR
};

CONFIG.minify = {
    cssSrc: (DIST_DIR + '/*.css'),
    jsSrc: (DIST_DIR + '/*.js'),
    cssDest: DIST_DIR,
    jsDest: DIST_DIR
};

if (ftppass) {
    _.extend(CONFIG.deploy,
        ftppass.dev ? {
            dev: {
                host: ftppass.dev.host,
                user: ftppass.dev.username,
                pass: ftppass.dev.password,
                remotePath: REMOTE_PATH
            }
        } : null,
        ftppass.staging ? {
            staging: {
                host: ftppass.staging.host,
                user: ftppass.staging.username,
                key: ftppass.staging.keyLocation,
                remotePath: REMOTE_PATH
            }
        } : null,
        ftppass.production ? {
            production: {
                host: ftppass.production.host,
                user: ftppass.production.username,
                key: ftppass.production.keyLocation,
                remotePath: REMOTE_PATH
            }
        } : null
    );
}

module.exports = CONFIG;
