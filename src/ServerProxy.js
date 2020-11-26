const PORT = 8080;

class ServerProxy {

    constructor( props ) {
        this.getServerUrl = this.getServerUrl.bind(this);
        this.getOptions = this.getOptions.bind(this)
    }

    getServerUrl() {
        return "http://" + window.location.hostname + ":" + PORT;
    }

    async getOptions() {
        let serverUrl = this.getServerUrl() + "/options";
        let options = null;

        try {
            let jsonReturned = await fetch(serverUrl, {
                method: "GET"
            });

            options = await jsonReturned.json();

        } catch (e) {
            console.log('Error getting options: ' + serverUrl);
            console.log(e);
        }
        return options;
    }

    async submitBoard( options ) {
        let serverUrl = this.getServerUrl() + "/submit";
        let response = null;

        try {
            let jsonReturned = await fetch( serverUrl, {
                method: "POST",
                body: JSON.stringify(options)
            } )
            response = await jsonReturned.json();
        }
        catch( e ) {
            console.log('Error submitting board: ' + serverUrl)
            console.log(e);
        }

        return response;
    }
}

//export default ServerProxy;
const proxy = new ServerProxy();
export default proxy;
