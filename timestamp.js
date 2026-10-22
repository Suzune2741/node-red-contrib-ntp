module.exports = function(RED) {
    function TimestampNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        this.varname = config.varname || "t1";
        this.format = config.format;

        node.on('input', function (msg, send, done) {
            send = send || function() { node.send.apply(node, arguments) };

            let generatedCode = "";

            switch (node.format) {
                case "date_only":
                    generatedCode = `${node.varname} = sprintf("%02d-%02d-%02d", time.year, time.mon, time.mday)`;
                    break;
                case "time_only":
                    generatedCode = `${node.varname} = sprintf("%02d:%02d:%02d", time.hour, time.min, time.sec)`;
                    break;
                case "full_compact":
                    generatedCode = `${node.varname} = sprintf("20%02d%02d%02d%02d%02d%02d", time.year, time.mon, time.mday, time.hour, time.min, time.sec)`;
                    break;
                default:
                    generatedCode = `${node.varname} = sprintf("%02d:%02d:%02d", time.hour, time.min, time.sec)`;
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
