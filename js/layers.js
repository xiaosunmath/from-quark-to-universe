addLayer("chapter", {
    infoboxes:{
        c0Box:{
            title:"Chapter 0 - Everything started",
            body(){
                return "? : Who am I? Where is there?<br>" +
                    "[] : YESSSSS!I AM SUCCEEDED!<br>" + 
                    "? : ?.mul(100)<br>" + 
                    "[] : You are a consciousness.Without any body.I\'am so boring,so I make you.Now go into this...<br>" + 
                    "? : What\'s this?Why it continuously go out?<br>" + 
                    "[] : That\'s quark.The smallest unit in the world.<br>" + 
                    "? : What can I do?<br>" + 
                    "[] : To do something you want to do.I will permanently observe you."
            },
            bodyStyle(){
                return {"text-align": "left"}
            }
            //开始写的设定啥的没整好，现在在整设定，最后一口气发出来
        },
    },
    name: "chapter",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    resource: "progress",
    tabFormat: {
        "chapter 0": {
            content: [ ["infobox","c0Box"] ],
        },
    },
    row: "side",
    
    layerShown(){return false}
})
addLayer("quark", {
    name: "quark",
    symbol: "Q",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        up: n(0),
        down: n(0),
        strange: n(0),
        charm: n(0),
        botton: n(0),
        top: n(0),
    }},
    color: "#FFFFFF",
    resource: "quark",
    tabFormat: {
        "quark": {
            content: [
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.points) + " quark"
                    },
                    {"font-size":"30px"}
                ],
                ["display-text",
                    function(){
                        return "You get " + format(tmp.quark.quarkgain) + " quark every second"
                    },
                    {"font-size":"20px"}
                ],["blank",["1px","80px"]],
                ["row",[["upgrade",11]]],
                ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24]]],
                ["row",[["upgrade",31],["upgrade",32],["upgrade",33],["upgrade",34]]],
                ["row",[["upgrade",41],["upgrade",42],["upgrade",43],["upgrade",44]]],

                ["blank",["1px","80px"]],
                ["display-text",
                    function(){
                        if(hasUpgrade("quark",11)) return "quark > up quark > down quark > strange quark > charm quark > botton quark > top quark"
                    }
                ],

                ["row",[["display-text",
                    function(){
                        if(tmp.quark.up_unlocked) return "Make your quark to the Upquark. You gain " + tmp.quark.upgain + " Upquark every second"
                    }
                ],["blank",["10px","1px"]],["clickable",11]]],
                ["row",[["display-text",
                    function(){
                        if(tmp.quark.down_unlocked) return "Make your Upquark to the Downquark. You gain " + tmp.quark.downgain + " Downquark every second"
                    }
                ],["blank",["10px","1px"]],["clickable",12]]],
                ["row",[["display-text",
                    function(){
                        if(tmp.quark.strange_unlocked) return "Make your Downquark to the Strange quark. You gain " + tmp.quark.strangegain + " Strange quark every second"
                    }
                ],["blank",["10px","1px"]],["clickable",13]]],
            ],
        },
        "flavours": {
            content: [
                ["display-text","Each quark loses 1% every second",{"font-size":"30px"}],
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.up) + " up quark"
                    },
                    {"font-size":"30px"}
                ],
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.down) + " down quark"
                    },
                    {"font-size":"30px"}
                ],
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.strange) + " strange quark"
                    },
                    {"font-size":"30px"}
                ],
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.charm) + " charm quark"
                    },
                    {"font-size":"30px"}
                ],
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.botton) + " botton quark"
                    },
                    {"font-size":"30px"}
                ],
                ["display-text",
                    function(){
                        return "You have " + format(player.quark.top) + " top quark"
                    },
                    {"font-size":"30px"}
                ],
            ],
            
            unlocked(){
                return hasUpgrade("quark",11)
            },
        },
        "buyables": {
            content: [
                ["row",[["buyable",11],["blank",["20px","1px"]],["buyable",12],["blank",["20px","1px"]],["buyable",13]]]
            ],
            unlocked(){
                return hasUpgrade("quark",31)
            },
        },
    },
    quarkgain(){
        let gain = n(1)
        if(hasUpgrade("quark",21)) gain = gain.mul(upgradeEffect("quark",21))
        gain = gain.mul(buyableEffect("quark",11))
        gain = gain.mul(buyableEffect("quark",12))

        if(hasUpgrade("quark",42)) gain = gain.mul(3)


        if(getClickableState("quark",11) == 1) gain = gain.sub(player.quark.points.mul(0.1).add(10))
        return gain
    },
    upgain(){
        let gain = n(0)
        let bas = n(10)
        let roo = n(3)
        if(hasUpgrade("quark",34)) bas = n(2)
        if(hasUpgrade("quark",43)) roo = n(2)
        if(getClickableState("quark",11) == 1) gain = player.quark.points.max(0).div(bas).root(roo)
        if(hasUpgrade("quark",22)) gain = gain.mul(upgradeEffect("quark",22))
        gain = gain.mul(buyableEffect("quark",13))
        
        if(getClickableState("quark",12) == 1) gain = gain.sub(player.quark.up.mul(0.05).add(10))
        
        gain = gain.floor()
        return gain
    },
    downgain(){
        let gain = n(0)
        let roo = n(3)
        if(hasUpgrade("quark",44)) roo = n(2)
        if(getClickableState("quark",12) == 1) gain = player.quark.up.max(0).div(10).root(roo)
        if(hasUpgrade("quark",32)) gain = gain.mul(upgradeEffect("quark",32))
        
        if(getClickableState("quark",13) == 1) gain = gain.sub(player.quark.down.mul(0.03).add(100))
        
        gain = gain.floor()
        return gain
    },
    strangegain(){
        let gain = n(0)
        if(getClickableState("quark",13) == 1) gain = player.quark.down.max(0).div(100).root(3)
        //if(hasUpgrade("quark",32)) gain = gain.mul(upgradeEffect("quark",32))
        
        gain = gain.floor()
        return gain
    },
    update(diff){
        player.quark.points = player.quark.points.add(tmp.quark.quarkgain.mul(diff))
        player.quark.up = player.quark.up.add(tmp.quark.upgain.mul(diff))
        player.quark.down = player.quark.down.add(tmp.quark.downgain.mul(diff))
        player.quark.strange = player.quark.strange.add(tmp.quark.strangegain.mul(diff))

        player.quark.up = player.quark.up.sub(player.quark.up.mul(0.01).mul(diff))
        player.quark.down = player.quark.down.sub(player.quark.down.mul(0.01).mul(diff))
        player.quark.strange = player.quark.strange.sub(player.quark.strange.mul(0.01).mul(diff))

        if(player.quark.points.lte(0)){
            setClickableState("quark",11,0)
            player.quark.points = n(0)
        }
        if(player.quark.up.lte(0)){
            setClickableState("quark",12,0)
            player.quark.up = n(0)
        }
        if(player.quark.down.lte(0)){
            setClickableState("quark",13,0)
            player.quark.down = n(0)
        }
    },
    upgrades: {
        11: {
            fullDisplay(){
                let disp = "<h2>Started.</h2>" + "<br>Unlock quark flavours." + "<br>cost: " + this.cost + " quark"
                return disp
            },
            cost: new Decimal(10),
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#77BF5F"
                else{
                    if(player.quark.points.gte(this.cost)) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
        },
        21: {
            fullDisplay(){
                let disp = "<h2>Upquark boost.</h2>" + "<br>Quark gain boost based on Upquark amount.<br>currectly: x" + format(this.effect()) + "<br>cost: 1 Upquark"
                return disp
            },
            canAfford(){
                return player.quark.up.gte(1)
            },
            pay(){
                player.quark.up = player.quark.up.sub(1)
            },
            effect(){
                return player.quark.up.max(0).add(1).log(2).add(1)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#FF0000"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",11)
            }
        },
        22: {
            fullDisplay(){
                let disp = "<h2>Boost Upquark.</h2>" + "<br>Upquark gain boost based on Upquark amount.<br>currectly: x" + format(this.effect()) + "<br>cost: 10 Upquark"
                return disp
            },
            canAfford(){
                return player.quark.up.gte(10)
            },
            pay(){
                player.quark.up = player.quark.up.sub(10)
            },
            effect(){
                return player.quark.up.max(0).add(1).log(100).add(1)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#FF0000"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",21)
            }
        },
        23: {
            fullDisplay(){
                let disp = "<h2>Downquark.</h2>" + "<br>Unlock Down quark." + "<br>cost: 50 Upquark"
                return disp
            },
            canAfford(){
                return player.quark.up.gte(50)
            },
            pay(){
                player.quark.up = player.quark.up.sub(50)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#FF0000"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",22)
            }
        },
        24: {
            fullDisplay(){
                let disp = "<h2>Quark Buff</h2>" + "<br>The effect base of the first buyable + 0.015." + "<br>cost: 50 Upquark"
                return disp
            },
            canAfford(){
                return player.quark.up.gte(2000)
            },
            pay(){
                player.quark.up = player.quark.up.sub(2000)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#FF0000"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",22)
            }
        },
        31: {
            fullDisplay(){
                let disp = "<h2>A small boost.</h2>" + "<br>Unlock some buyables." + "<br>cost: 1 Downquark"
                return disp
            },
            canAfford(){
                return player.quark.down.gte(1)
            },
            pay(){
                player.quark.down = player.quark.down.sub(1)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FFFF"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",23)
            }
        },
        32: {
            fullDisplay(){
                let disp = "<h2>Downquark gain boost</h2>" + "<br>Boost your Downquark gain based on your quark." + "<br>currectly: x" + format(this.effect()) + "<br>cost: 100 Downquark"
                return disp
            },
            canAfford(){
                return player.quark.down.gte(100)
            },
            pay(){
                player.quark.down = player.quark.down.sub(100)
            },
            effect(){
                return player.quark.points.add(1).log(10).add(1)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FFFF"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",31)
            }
        },
        33: {
            fullDisplay(){
                let disp = "<h2>Strange quark</h2>" + "<br>Unlock Stange quark" + "<br>cost: 1000 Downquark"
                return disp
            },
            canAfford(){
                return player.quark.down.gte(1000)
            },
            pay(){
                player.quark.down = player.quark.down.sub(1000)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FFFF"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",32)
            }
        },
        34: {
            fullDisplay(){
                let disp = "<h2>UpQuark base</h2>" + "<br>UpQuark's gain base is 2" + "<br>cost: 1500 Downquark"
                return disp
            },
            canAfford(){
                return player.quark.down.gte(1500)
            },
            pay(){
                player.quark.down = player.quark.down.sub(1500)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FFFF"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",24)
            }
        },
        41: {
            fullDisplay(){
                let disp = "<h2>More Upgrades.</h2>" + "<br>Unlock a col of upgrades." + "<br>cost: 1 Strange quark"
                return disp
            },
            canAfford(){
                return player.quark.strange.gte(1)
            },
            pay(){
                player.quark.down = player.quark.strange.sub(1)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FF00"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",32)
            }
        },
        42: {
            fullDisplay(){
                let disp = "<h2>Normal Boost.</h2>" + "<br>Quark gain x3." + "<br>cost: 10 Strange quark"
                return disp
            },
            canAfford(){
                return player.quark.strange.gte(10)
            },
            pay(){
                player.quark.down = player.quark.strange.sub(10)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FF00"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",34)
            }
        },
        43: {
            fullDisplay(){
                let disp = "<h2>UpQuark Gain</h2>" + "<br>UpQuark's gain is better." + "<br>cost: 20 Strange quark"
                return disp
            },
            canAfford(){
                return player.quark.strange.gte(20)
            },
            pay(){
                player.quark.down = player.quark.strange.sub(20)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FF00"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",42)
            }
        },
        44: {
            fullDisplay(){
                let disp = "<h2>DownQuark Gain</h2>" + "<br>DownQuark's gain is better." + "<br>cost: 50 Strange quark"
                return disp
            },
            canAfford(){
                return player.quark.strange.gte(50)
            },
            pay(){
                player.quark.down = player.quark.strange.sub(50)
            },
            style(){
                let color = "#BF8F8F"
                if(hasUpgrade(this.layer,this.id)) color = "#00FF00"
                else{
                    if(this.canAfford()) color = "#DDDDDD"
                }
                return {"background-color":color,"border":"3px solid white"}
            },
            unlocked(){
                return hasUpgrade("quark",43)
            }
        },
    },
    clickables: {
        11:{
            display(){
                let disp
                if(getClickableState(this.layer,this.id) == 0) disp = "close"
                else disp = "open"
                return disp
            },
            canClick(){
                return true
            },
            onClick(){
                if(getClickableState(this.layer,this.id) == 0) setClickableState(this.layer,this.id,1)
                else setClickableState(this.layer,this.id,0)
            },
            unlocked(){
                return tmp.quark.up_unlocked
            },
            style(){
                let color
                if(getClickableState(this.layer,this.id) == 0) color = "red"
                else color = "green"
                return {"background-color":color,"height":"20px","min-height":"0px","width":"40px"}
            }
        },
        12:{
            display(){
                let disp
                if(getClickableState(this.layer,this.id) == 0) disp = "close"
                else disp = "open"
                return disp
            },
            canClick(){
                return true
            },
            onClick(){
                if(getClickableState(this.layer,this.id) == 0) setClickableState(this.layer,this.id,1)
                else setClickableState(this.layer,this.id,0)
            },
            unlocked(){
                return tmp.quark.down_unlocked
            },
            style(){
                let color
                if(getClickableState(this.layer,this.id) == 0) color = "red"
                else color = "green"
                return {"background-color":color,"height":"20px","min-height":"0px","width":"40px"}
            }
        },
        13:{
            display(){
                let disp
                if(getClickableState(this.layer,this.id) == 0) disp = "close"
                else disp = "open"
                return disp
            },
            canClick(){
                return true
            },
            onClick(){
                if(getClickableState(this.layer,this.id) == 0) setClickableState(this.layer,this.id,1)
                else setClickableState(this.layer,this.id,0)
            },
            unlocked(){
                return tmp.quark.strange_unlocked
            },
            style(){
                let color
                if(getClickableState(this.layer,this.id) == 0) color = "red"
                else color = "green"
                return {"background-color":color,"height":"20px","min-height":"0px","width":"40px"}
            }
        },
    },
    buyables: {
        11: {
            title(){
                return "Quark boost"
            },
            cost(x) {
                let bas = n(1.1)
                return n(1).mul(bas.pow(x))
            },
            bas(){
                let bas = n(1.075)
                if(hasUpgrade("quark",24)) bas = bas.add(0.015)
                return bas
            },
            effect(){
                return this.bas().pow(getBuyableAmount(this.layer,this.id))
            },
            display() {
                return "Quark gain *1.075 every bought<br>currectly: *" + format(this.effect()) + "<br>cost: " + format(this.cost()) + " Downquark"
            },
            canAfford() {
                return player.quark.down.gte(this.cost())
            },
            buy() {
                player.quark.down = player.quark.down.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip(){
                return "amount:" + getBuyableAmount(this.layer,this.id)
            },
            style(){

            }
        },
        12: {
            title(){
                return "Downquark boost"
            },
            cost(x) {
                let bas = n(1.2)
                return n(2).mul(bas.pow(x.pow(1.5)))
            },
            effect(){
                let bas = player.quark.down.add(1).log(10).add(1)
                return bas.mul(getBuyableAmount(this.layer,this.id).log(10).add(1))
            },
            display() {
                return "Based on your Downquark boost your quark gain.<br>currectly: *" + format(this.effect()) + "<br>cost: " + format(this.cost()) + " Downquark"
            },
            canAfford() {
                return player.quark.down.gte(this.cost())
            },
            buy() {
                player.quark.down = player.quark.down.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip(){
                return "amount:" + getBuyableAmount(this.layer,this.id)
            },
            style(){

            }
        },
        13: {
            title(){
                return "Upquark gain boost"
            },
            cost(x) {
                let bas = n(1.5)
                return n(20).mul(bas.pow(x))
            },
            effect(){
                let bas = n(1.05)
                return bas.pow(getBuyableAmount(this.layer,this.id))
            },
            display() {
                return "Boost your Upquark gain.<br>currectly: *" + format(this.effect()) + "<br>cost: " + format(this.cost()) + " Downquark"
            },
            canAfford() {
                return player.quark.down.gte(this.cost())
            },
            buy() {
                player.quark.down = player.quark.down.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            tooltip(){
                return "amount:" + getBuyableAmount(this.layer,this.id)
            },
            style(){

            }
        },
    },
    up_unlocked(){
        return hasUpgrade("quark",11)
    },
    down_unlocked(){
        return hasUpgrade("quark",23)
    },
    strange_unlocked(){
        return hasUpgrade("quark",33)
    },
    row: 0,
    layerShown(){return true}
})
addLayer("lepton", {
    name: "lepton",
    symbol: "L",
    position: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        electron: n(0),
        muon: n(0),
        tau: n(0),
        electron_neutrino: n(0),
        muon_neutrino: n(0),
        tau_neutrino: n(0),
    }},
    color: "#FFFFFF",
    resource: "lepton",
    tabFormat: {
        "lepton": {
            content: [
                ["display-text",
                    function(){
                        return "You have " + format(player.lepton.points) + " lepton"
                    },
                    {"font-size":"30px"}
                ]
            ],
        },
    },
    row: 0,
    layerShown(){return false}
})