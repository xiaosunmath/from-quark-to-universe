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
                ["row",[["upgrade",11]]],["blank",["1px","80px"]],
                ["display-text",
                    function(){
                        if(hasUpgrade("quark",11)) return "quark > up quark > down quark > strange quark > charm quark > botton quark > top quark"
                    }
                ],
                ["row",[["display-text",
                    function(){
                        if(tmp.quark.up_unlocked) return "Make your quark to the up quark. You gain " + tmp.quark.upgain + " up quark every second"
                    }
                ],["blank",["10px","1px"]],["clickable",11]]],
            ],
        },
        "quark flavours": {
            content: [
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
    },
    quarkgain(){
        let gain = n(1)

        if(getClickableState("quark",11) == 1) gain = gain.sub(player.quark.points.mul(0.03).add(10))
        return gain
    },
    upgain(){
        let gain = n(0)
        if(getClickableState("quark",11) == 1) gain = player.quark.points.div(10).root(3).floor()
        return gain
    },
    update(diff){
        player.quark.points = player.quark.points.add(tmp.quark.quarkgain.mul(diff))
        if(getClickableState("quark",11) == 1) player.quark.up = player.quark.up.add(tmp.quark.upgain.mul(diff))

        if(player.quark.points.lte(0)){
            setClickableState("quark",11,0)
            player.quark.points = n(0)
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
    },
    up_unlocked(){
        return hasUpgrade("quark",11)
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