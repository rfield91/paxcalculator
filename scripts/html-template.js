import { map } from 'lodash';

export default ({htmlWebpackPlugin}) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Pax Calculator</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1.0, viewport-fit=cover">
                
                ${map(htmlWebpackPlugin.files.css, (file) => {
                    return `<link href="${file}" rel="stylesheet" type="text/css" />`
                }).join('\n')}
                <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400,600,700,900&display=swap" rel="stylesheet">
                <script>
                    window.basename = '/';
                    //window.publicPath = '/assets/'; 
                </script>
            </head>
            <body>
                <div id="root" aria-busy="true" aria-live="polite"></div>
                <noscript>
                    <div class="noscript-warning">
                        <div aria-role="alert" class="noscript-warning__message">
                            <p>JavaScript is off. <br/>Please enable JavaScript to use this application.</p>
                        </div>
                    </div>
                </noscript>
                ${map(htmlWebpackPlugin.files.js, (file) => {
                    return `<script src="${file}"></script>`
                }).join('\n')}
            </body>
        </html>
    `
}
