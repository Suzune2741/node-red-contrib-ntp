module.exports = function(RED) {
    
    function ntp_TimeSync(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.server = config.server;
        this.timezone = config.timezone;
        
            if (!node.server || node.server === "") {
                // throw ではなく、Node-RED標準のエラー通知を使う
                if (done) {
                    done("同期するサーバーの名前を入力してください");
                } else {
                    node.error("同期するサーバーの名前を入力してください", msg);
                }
                return; // ここで処理を止める
            }
    }

    RED.nodes.registerType("ntp",ntp_TimeSync);
}
