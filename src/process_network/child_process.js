import { rejects } from "node:assert";
import process from "node:child_process";
import os from "node:os";
import { stderr, stdout } from "node:process";

export const processExec = async (req, res) => {
    const cmd = "lsof -i -P -n | grep LISTEN"
    await process.exec(
        cmd,
        ((error, stdout, stderr) => {
            if (error) {
                console.log({
                    "ErrorCode: ": error.code,
                    "ErrorCMD: ": error.cmd,
                    "ErrorMessage: ": error.message,
                });

                res.status(404).send({
                    "ErrorCode: ": error.code,
                    "ErrorCMD: ": error.cmd,
                    "ErrorMessage: ": error.message,
                });
            };

            if (stdout) {
                res.setHeader('content-type', 'text/plain');
                console.log(stdout);
                res.status(201).send("\nResults: " + stdout)
            };
            if (!error && stderr) {
                console.log(stderr);
                res.status(404).send("\nError Execution.. " + cmd)
            };
        }),
    )
};


export const shellCmd = async (req, res) => {
    const { cmd } = req.body
    if (os.platform() === "linux") {
        process.exec(cmd, (err, result) => {
            if (!err) {
                console.log(req.body);
                res.setHeader('content-type', 'text/plain');
                res.send(`${result}`)
            } else {
                res.setHeader('content-type', 'text/plain');
                res.send("Can't Execute the Command..")
            }
        })
    } else if (os.platform() === "win32") {
        const { command } = req.body;

        try {
            const result = await executePowershellCommand(command);
            res.setHeader('content-type', 'text/plain');
            res.send(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    } else if (os.platform() === "darwin") {

        process.exec(cmd, (err, result) => {
            if (!err) {
                console.log(req.body);
                res.setHeader('content-type', 'text/plain');
                res.send(`${result}`)
            } else {
                res.setHeader('content-type', 'text/plain');
                res.send("Can't Execute the Command..")
            }
        })
    }
}


const executePowershellCommand = (command) => {
    return new Promise((resolve, reject) => {
        const child = process.spawn('powershell.exe', [command]);

        let output = '';
        let errorOutput = '';

        child.stdout.on('data', (data) => {
            output += data.toString();
        });

        child.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(errorOutput));
            } else {
                resolve(output);
            }
        });
    });
};


export const processExe = async (req, res) => {
    process.exec("ufw status", (error, stdout, stderr) => {

        if (error) {
            console.error(`exec error: ${error}`);
            res.setHeader('content-type', 'text/plain');
            res.send(error);
        }

        if (stdout) {
            console.log(`${stdout}`);
            res.setHeader('content-type', 'text/plain');
            res.send(`${stdout}`);
        }

        if (!error && stderr) {
            console.log(`${stderr}`);
            res.setHeader('content-type', 'text/plain');
            res.send(`${stderr}`);
        }
    });
}


export const processSpawn = async (req, res) => {
    const cmd = process.spawn("ls", ["-la", "/root"]);

    cmd.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.setHeader('content-type', 'text/plain');
        res.send(`stdout: ${data}`);
    });


    cmd.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.setHeader('content-type', 'text/plain');
        res.send(`stderr: ${data}`);
    });
}


export const processExecFile = async (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.send(await readShFile());
}


const readShFile = (() => {

    const file = __dirname + "/src/process_network/process.sh";

    return new Promise((resolve, reject) => {

        let output = '';
        let errorOutput = '';

        process.execFile(file, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                errorOutput += (error);
            }

            if (stdout) {
                console.log(`${stdout}`);
                output += (`${stdout}`);
            }

            if (!error && stderr) {
                console.log(`${stderr}`);
                errorOutput += (`${stderr}`);
            }
        })
            .on("close", data => {
                if (data !== 0) {
                    return reject(new Error(errorOutput));
                } else {
                    return resolve(output);
                }
            });
    })
})