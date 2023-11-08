import dns from "node:dns/promises";
import net from 'node:net';
import os from 'node:os';

export const dnsLookup = async (req, res) => {
    const addr = await dns.getServers(); //"192.168.1.1"
    const resolver = new dns.Resolver();
    //console.log(resolver.getServers());

    const options = {
        family: 6,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
    };

    //options.all = true; // this will return the result as Array i.g. 

    const lookup = await dns.lookup("google.com", options)
        .then(result => {
            console.log('address: %j family: IPv%s', result.address, result.family); // address: "192.168.1.200" family: IPv4
            return result;
        })

    res.status(201).json(lookup)
}


export const netLookup = async (req, res) => {
    const ip = net.Server();
    console.log(ip);


    res.status(201).json(ip)
}


export const sysDetail = async (req, res) => {
    const load = os.loadavg();


    function netCard() {
        const inf = os.networkInterfaces();
        const arr = [];
        if (os.platform() === "linux") {
            //console.log(inf.ens33);
            inf.ens33.forEach(el => {
                console.log(el.address);
                el.family === "IPv4" ? arr.push(el.address) : ""
            })
        }
        return arr;
    }


    res.status(201).json({
        hostname: os.hostname(),
        homeDir: os.homedir(),
        totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)) + "gb",
        freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024)) + "gb",
        platform: os.platform(),
        architecture: os.arch(),
        osVersion: os.version(),
        osRelease: os.release(),
        osMachine: os.machine(),
        cores: Array.isArray(os.cpus()) ? os.cpus().length : null,
        cpu: os.cpus().map(cpu => `Model: ${cpu.model}, Speed:${cpu.speed}`),
        cpuLoad: {
            load_1: load[0],
            load_2: load[1],
            load_3: load[2],
        },
        networkInterfaces: netCard(),
        userName: os.userInfo().username,
        userHomeDir: os.userInfo().homedir,
        pid: os.getPriority(),
    })
}