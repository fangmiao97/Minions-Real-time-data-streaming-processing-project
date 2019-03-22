const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    },
        {
            libraryName: 'ant-design-pro',
            libraryDirectory: 'lib',
            style: true,
            camel2DashComponentName: false,
        }),
);

addLessLoader({
    javascriptEnabled: true,
    modifyVars:{'@primary-color': '#35ce7b'}
})