module.exports = function(RED) {
    function TimestampNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.server = config.server;
        this.timezone = config.timezone;
        this.varname = config.varname || "t1";
        this.dataname = config.dataname;
        this.format = config.format;

        node.on('input', function (msg, send, done) {
            send = send || function() { node.send.apply(node, arguments) };

            if (!node.server || node.server === "") {
                if (done) {
                    done("同期するサーバーの名前を入力してください");
                } else {
                    node.error("同期するサーバーの名前を入力してください", msg);
                }
                return; 
            }

            // 出力するコードの組み立て
            let generatedCode = "";

             generatedCode += `Time.sync_ntp("${node.server}")\n`;

            switch (node.format) {
                case "date_only":
                    generatedCode += `${node.varname} = sprintf("%02d-%02d-%02d", time.year, time.mon, time.mday)`;
                    break;
                case "time_only":
                    generatedCode += `${node.varname} = sprintf("%02d:%02d:%02d", time.hour, time.min, time.sec)`;
                    break;
                case "full_compact":
                    generatedCode += `${node.varname} = sprintf("20%02d%02d%02d%02d%02d%02d", time.year, time.mon, time.mday, time.hour, time.min, time.sec)`;
                    break;
                default:
                    generatedCode += `${node.varname} = sprintf("%02d:%02d:%02d", time.hour, time.min, time.sec)`;
            }

            msg.payload = generatedCode;
            send(msg);

            if (done) {
                done();
            }
        });
    }

    RED.nodes.registerType("timestamp", TimestampNode);
}
