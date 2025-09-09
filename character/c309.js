import { lib, game, ui, get, ai, _status } from "../noname.js";


game.import("character", function () {
	return {
		connect: true,
		card: {
			ma: {
				audio: true,
				fullskin: true,
				type: "basic",
				cardcolor: "club",
				enable: false,
				destroy: "discardPile",
				derivation: "klpig",
				getMa(count) {
					var cards = [];
					if (typeof count != "number") count = 1;
					while (count--) {
						let card = game.createCard2("ma", "club", 8);
						cards.push(card);
					}
					return cards;
				},
				ai: {
					basic: {
						useful: 0,
						value: function (card, player) {
							let ct = 0;
							if (player.hasSkill('mayu')) return 100;
							if (player.hasSkill("yuanma") && !player.storage.yuanma) ct += 3 * player.countCards("ma");
							if (player.hasSkill("yequan")) ct += 3;
							if (player.hasSkill("vjuxiang")) ct += 9;
							if (player.hasSkill("shence")) ct += 30;
							else if (player.hasSkill("vbihuo")) ct += 5;
							if (player.hasSkill("jingshi")) ct = Math.max(ct, lib.card.tao.ai.basic.value(card, player));
							
							return ct;
						},
					},
				},

			},
			mxie: {
				audio: true,
				fullskin: true,
				type: "basic",
				cardcolor: "heart",
				cardnumber: 12,
				enable: true,
				destroy: "discardPile",
				toself: true,
				derivation: "johnson",
				filterTarget: function (card, player, target) {
					return target == player;
				},
				modTarget: true,
				usable: 1,
				getXie(count) {
					var cards = [];
					if (typeof count != "number") count = 1;
					while (count--) {
						let card = game.createCard2("mxie", "heart", 12);
						cards.push(card);
					}
					return cards;
				},
				content: function () {
					target.changeHujia(1, "gain")
				},
				ai: {
					basic: {
						useful: 0,
						value: 100
					},
				},

			},
			dian: {
				audio: true,
				fullskin: true,

				type: "basic",
				cardcolor: "spade",
				cardnumber: 7,

				derivation: "sp_kampui",

				filterTarget: function (card, player, target) {
					return true;
				},

				enable: true,
				destroy: "discardPile",
				usable: 1,

				getDian(count) {
					var cards = [];
					if (typeof count != "number") count = 1;
					while (count--) {
						let card = game.createCard2("dian", "spade", 7);
						cards.push(card);
					}
					return cards;
				},
				content: function () {
					target.damage(2, "thunder")
					target.recover(2)
					player.loseHp();
				},
				ai: {
					basic: {
						useful: 0,
						value: 100
					},
				},
			}
		},
		name: "c309",
		character: {
			std_kampui: ["male", "prog", 3, ["stdfengtian", "stdhongtu"], ["name:陈|KamPui"]],
			std_austin: ["male", "prog", 3, ["stdshenru", "stdjujian"]],
			std_jinye: ["male", "prog", 3, ["stdjingshi", "stdyequan"]],
			std_vika: ["male", "prog", 3, ["stdyixiang", "stdmizong"]],
			kampui: ["male", "prog", 3, ["fengtian", "hongtu", "yuanma"], ["name:陈|KamPui"]],
			austin: ["male", "prog", "3/4", ["maibi", "debi", "yuanma"]],
			jinye: ["male", "prog", "1/6/5", ["jingshi", "yequan", "yuanma"]],
			vika: ["male", "prog", 5, ["vyixiang", "vbihuo", "yuanma"]],
			shihong: ["male", 'prog', 4, ["bulai", 'nishui', "yuanma"]],
			albert: ["male", "prog", 3, ["tangren", "lunzheng", "wuli"]],
			wilson: ["male", "mech", 4, ["tangren", "feiti"]],
			klpig: ["male", "prog", 3, ["mayu", "mashen", "kuaizai", "yuanma"]],
			re_kampui: ["male", "prog", "1/3/2", ["drlt_qianjie", "fengtian", "huituo", "bazhen", "yuanma"], ["name:陈|KamPui"]],
			re_austin: ["male", "prog", "2/4", ["remaibi", "redebi"]],
			sb_kampui: ["male", "prog", 4, ["drlt_qianjie", "jsrgxushi", "shence", "yuanma"], ["name:陈|KamPui"]],
			zsh: ["male", "prog", "2/3", ["tangren", "nishui", "xiaoxue"]],
			khari: ["male", "prog", 4, ["yima", "jinpei", "yuanma"]],

			sp_kampui: ["male", "prog", 3, ["touyuan", "mayi", "lingdian", "yuanma"], ["doublegroup:prog:elec"]],
			sp_albert: ["male", "n309", 3, ["tangren", "pengji", "kuangnu"]],

			shen_kampui: ["male", "prog", "1/4/2", ["drlt_qianjie", "fengtian", "hongtu", "jinsheng", "yuanma"]],
			shen_austin: ["male", "prog", 2, ["jiamei", "lushen", "zuofu"]],
			johnson: ["male", "mech", 3, ["jiuyao", "xiejia"]]
		},
		skill: {
			yuanma: {
				audio: 2,
				groupSkill: "prog",
				trigger: { player: "gainAfter" },
				derivation: ["reqicai", "reyingzi", "reguicai", "reweimu"],
				forced: true,
				filter: function(event, player){
					return player.group == "prog" && player.countCards("h", "ma") >= 2;
				},
				content: function(){
					"step 0"
					const ct = player.countCards("h", "ma");
					if (ct >= 2){
						player.addSkills("reqicai")
					}
					if (ct >= 5){
						player.addSkills("reyingzi")
					}
					if (ct >= 8){
						player.addSkills("reguicai")
					}
					if (ct >= 10){
						player.addSkills("reweimu")
					}
				}
			},

			fengtian: {
				audio: 2,
				trigger: { global: "judge" },
				direct: true,
				subSkill: {
					disable: {
						trigger: { global: "judgeBefore"},
						forced: true,
						content: function(){
							if (player.hasSkill('reguicai'))
							player.disableSkill("reguicai");
							if (player.hasSkill('guicai'))
							player.disableSkill("guicai");
						}
					}
				},
				group: ["fengtian_disable"],
				content: function* (event, map) {
					"step 0"
					var player = map.player;
					var trigger = map.trigger;
					var cds = get.cards(player.maxHp - player.hp + 1, false);
					var cards = [];
					for(var x = 0; x < cds.length; x++) cards.push(cds[x]);
					"step 1"
					if (player.hasSkill('reguicai') || player.hasSkill('guicai')){
						let res = yield player.chooseTarget({
							prompt: "选择要获得牌的角色",
							filterTarget: function(){
								return player.countCards('hes') > 0;
							},
							ai: function(target){
								return get.effect(target, {name:'shunshou'});
							}
						});
						if (res.bool) {
							let target = result.targets[0];
							let ccard = target.chooseCard("hes");
							target.discard(ccard);
							cards.push(ccard);
						}
					}
					if (player.hasSkill('yuanma')) {
						cards.push(lib.card.ma.getMa(1)[0]);
						cards.push(lib.card.ma.getMa(1)[0]);
					}
					console.log(cards)
					"step 2"
					let res2 = yield player.chooseButton(["是否更改判定结果？", cards], false);
					if(res2.bool){
						let resc = res2.links[0];
						cards.remove(resc);
					if (trigger.player.judging[0].clone) {
						trigger.player.judging[0].clone.classList.remove("thrownhighlight");
							game.broadcast(function (resc) {
								if (resc.clone) {
									resc.clone.classList.remove("thrownhighlight");
								}
							}, trigger.player.judging[0]);
							game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0] = resc;
						game.log(trigger.player, "的判定牌改为", resc);
						game.delayx();
						if (cards.length)
							player.gain(cards.randomGet(), "gain2");
					}
				}
			},
			stdfengtian: {
				audio: 2,
				trigger: { global: "judge" },
				direct: true,
				content: function* (event, map) {
					var player = map.player;
					var trigger = map.trigger;
					var card = get.cards(1, true)[0];
					let result = yield player.chooseButton(["是否更改判定结果？", [card]], false, function(){
						return trigger.judge(card) - trigger.judge(trigger.player.judging[0]) - .3;
					});
					if (result.bool){
						if (trigger.player.judging[0].clone) {
						trigger.player.judging[0].clone.classList.remove("thrownhighlight");
							game.broadcast(function (resc) {
								if (card.clone) {
									card.clone.classList.remove("thrownhighlight");
								}
							}, trigger.player.judging[0]);
							game.addVideo("deletenode", player, get.cardsInfo([trigger.player.judging[0].clone]));
						}
						game.cardsDiscard(trigger.player.judging[0]);
						trigger.player.judging[0] = card;
						game.log(trigger.player, "的判定牌改为", card);
						game.delayx();
					}else{
						player.gain(trigger.player.judging[0], "gain2");
					}
				}

			},

			stdhongtu: {
				position: "hs",
				audio: 2,
				filter: function(event, player){
					return player.countCards("hs") > 0;
				},
				trigger: {player: ["phaseUseBegin", "damageAfter"]},
				content: function* (event, map){
					let player = map.player;
					var resc = yield player.chooseCard(true, true).set("ai", function(){
						return (get.color(card) == "red") * get.value({name: "guaguliaodu"}) + (get.color(card) == "black") * get.value({name: "zhujinqiyuan"});
					});
					var card = resc.cards[0];
					game.delayx();
					var result = yield player.judge(function(jud){
						return (get.color(card) == get.color(jud)) * 4 - 2;
					})
					console.log(get.color(card), result);
					if(result.color == get.color(card)){
						if(result.color == "red"){
							player.chooseUseTarget({name: "guaguliaodu"})
						}else if(result.color == "black"){
							player.chooseUseTarget({name: "zhujinqiyuan"})
						}
					}else player.loseHp()
				},
				ai: {
					result: {
						player: 2,
					}
				}
			},

			hongtu: {
				usable: 1,
				enable: "phaseUse",
				trigger: {
					player: "damageAfter",
				},
				derivation: ["hongtu_gai", "nitian"],
				content: function (){
					"step 0"
					player.chooseTarget({
						filterTarget: function(card, player, target){
							return target.countCards("h") > 0;
						},
						ai: function(target){
							return get.attitude(target)
						}
					})
					"step 1"
					event.target = result.targets[0];
					if (event.target == player) player.loseHp(1);
					var target = event.target;
					target.chooseToDiscard(true).ai = function(card){
						return -get.value(card, target);
					}
					"step 2"
					event.card = result.cards[0];
					console.log(event.card)
					game.delay();
					if(!event.card) event.finish()
					"step 3"
					player.judge(function(jud){
						return (get.suit(jud) == get.suit(card)) + 3 * (get.number(jud) == get.number(card));
					})
					console.log(card)
					"step 4"
					player.storage.hongtu_num = result.number;
					player.storage.hongtu_suit = result.suit;
					if(get.suit(card) == player.storage.hongtu_suit){
						player.chooseBool("是否令目标弃两张手牌？").choice = function(){
							return (target.countCards("h") <= 1);
						}
					}else event.goto(6);
					"step 5"
					if (result.bool){
						player.line(target);
						target.chooseToDiscard("h", 1, true);
					}else player.draw(2);
					"step 6"

					if(get.number(card) == player.storage.hongtu_num){
						player.chooseBool("是否令目标失去一点体力？").choice = function(){
							return (target.hp == 1) + (player.isHealthy()) - (player.hp <= 1);
						}
					}else event.finish();
					"step 7"
					if (result.bool){
						target.loseHp()
					} else player.recover();
					"step 8"
					if(get.suit(card) == player.storage.hongtu_suit && get.number(card) == player.storage.hongtu_num){
						player.chooseToDiscard("是否弃置一张【码】？", "h", {name:"ma"}, false)
					}else event.finish()
					"step 9"
					if(result.bool){
						player.chooseBool("是否令目标减一点体力上限？").choice = function(){
							return (target.hp >= target.maxHp - 1);
						}
					}
					"step 10"
					if (result.bool){
						target.loseMaxHp()
					} else player.maxHp++;
				},
			},



			hongtu_gai: {
				usable: 2,
				enable: "phaseUse",
				trigger: {
					player: "damageAfter",
				},
				content: function (){
					"step 0"
					player.chooseTarget({
						filterTarget: function(card, player, target){
							return target.countCards("h") > 0;
						},
						ai: function(target){
							return 11 - get.attitude(target)
						}
					})
					"step 1"
					event.target = result.targets[0];
					if (event.target == player) player.loseHp(2);
					var target = event.target;
					target.chooseToDiscard(true).ai = function(card){
						return -get.value(card, target);
					}
					"step 2"
					event.card = result.cards[0];
					console.log(event.card)
					game.delay();
					if(!event.card) event.finish()
					"step 3"
					player.judge(function(jud){
						return 8 * Math.max(0, (get.suit(jud) == get.suit(card)) + (get.number(jud) == get.number(card)) + (get.number(jud) == get.number(card)) - 1);
					})
					console.log(card)
					"step 4"
					player.storage.hongtu_num = card.number == result.number;
					player.storage.hongtu_suit = card.suit == result.suit;
					player.storage.hongtu_name = card.name == result.name;
					"step 5"
					if(player.storage.hongtu_num + player.storage.hongtu_suit + player.storage.hongtu_name >= 2){
						player.changeHujia(Math.round(.5 + player.countCards("h", "ma") / 2), "gain");
					}else event.finish();
					"step 6"
					if(player.storage.hongtu_num + player.storage.hongtu_suit + player.storage.hongtu_name >= 3){
						if(!player.hasSkill('nitian')) player.addSkills('nitian')
						event.finish();
					}
				},
			},

			jinsheng: {
				skillAnimation: true,
				animationColor: "thunder",
				audio: 2,
				unique: true,
				juexingji: true,
				//priority:10,
				forced: true,
				trigger: { player: "phaseZhunbeiBegin" },
				filter: function (event, player) {
					return player.hp >= player.maxHp;
				},
				content: function () {
					"step 0";
					player.awakenSkill("jinsheng");
					player.loseMaxHp();
					"step 1";
					player.chooseTarget(true, "令一名角色调整体力上限").set("ai", function (target) {
						return 11 - get.attitude(_status.event.player, target) + player.maxHp - player.hp;
					});
					"step 2";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "green");
						target.loseMaxHp(target.maxHp - target.hp + 1, true);
					}
					"step 3";
					player.changeSkills(["hongtu_gai"], ["hongtu"]);
					player.storage.jinsheng = 1
				},
			},
			nitian: {
				unique: true,
				skillAnimation: true,
				animationColor: "thunder",
				audio: 2,
				derivation: ["shence"],
				trigger: { player: "phaseZhunbeiBegin" },
				forced: true,
				group: ["nitian_1", "nitian_2", "nitian_3", "nitian_4", "nitian_5"],
				content: function () {
					"step 0"
					player.awakenSkill("nitian");
					"step 1"
					player.loseMaxHp();
					"step 2"
					player.addSkills("shence");
				},
				subSkill: {
					1: {
						forced: true,
						trigger: { player: "useCardBefore" },
						filter: function(event, player){
							if(player.storage.nitian)return false;
							if(event.card && (event.card.name == 'shan' || event.card.name == 'wuxie')) return true;
							return false;
						},
						content: function(){
							trigger.cancel()
						}
					},
					2: {
						forced: true,
						trigger: { player: "damageBefore" },
						filter: function(event, player){
							if(player.storage.nitian)return false;
							return true
						},
						content: function(){
							trigger.num++;
						}
					},
					3: {
						forced: true,
						trigger: { player: "damageAfter"},
						filter: function(event, player){
							if(player.storage.nitian)return false;
							return true
						},
						content: function(){
							"step 0"
							player.judge(function(card){
								return -3 * (card.suit == "club" && card.suit >= 2 && card.suit <= 9);
							})
							"step 1"
							let card = result;
							if(card.suit == "club" && card.suit >= 2 && card.suit <= 9)
								player.loseHp();
						}
					},
					4: {
						forced: true,
						trigger: { player: "judgeBefore"},
						filter: function(event, player){
							if(player.storage.nitian)return false;
							return true
						},
						content: function(){
							player.storage.nitian_4_h = player.maxHp - player.hp;
							player.recover(player.storage.nitian_4_h);
						}
					},
					5: {
						forced: true,
						trigger: { player: "judgeAfter"},
						filter: function(event, player){
							if(player.storage.nitian)return false;
							return true
						},
						content: function(){
							player.loseHp(player.storage.nitian_4_h);
							player.storage.nitian_4_h = 0;
						}
					}
				}
			},
			shence: {
				audio: 2,
				enable: "phaseUse",
				selectCard: 1,
				position: "he",
				filter: function (event, player) {
					return player.countCards("h", "ma") > 0;
				},
				content: function* (event, map){
					var player = map.player;
					var trigger = map.trigger;
					var list = [];
					var lst = []
					list.push(game.createCard("sha", "club", 8, "none"));
					list.push(game.createCard("sha", "club", 8, "fire"));
					list.push(game.createCard("sha", "club", 8, "thunder"));
					list.push(game.createCard("sha", "club", 8, "ice"));
					list.push(game.createCard("sha", "club", 8, "stab"));
					list.push(game.createCard("sha", "club", 8, "kami"));
					list.push(game.createCard("shan", "club", 8, "none"));
					list.push(game.createCard("tao", "club", 8, "none"));
					list.push(game.createCard("jiu", "club", 8, "none"));
					list.push(game.createCard("xie", "club", 8, "none"));
					list.push(game.createCard("dian", "club", 8, "none"));
					for(var i in lib.card){
						if(i != undefined)
						if(lib.card[i].type == "trick")
							list.push(game.createCard(i, "club", 8));
					}
					let nl = [];
					for (let x = 0; x < list.length; x++)
						if(player.hasUseTarget(list[x]))
							nl.push(list[x]);
					let res = yield player.chooseButton("选择转化的牌", [nl]);
					if(res.bool){
						var card = res.links[0];
						game.delayx();
						let res2 = yield player.chooseToDiscard("h", "选择一张【码】", {name: "ma"})
						if(res2.bool){
							player.discard(res2.cards[0]);
							player.chooseUseTarget("视为使用" + get.translation(card), {name: card.name})
						}
					}
				},
			},
			
			maibi: {
				marktext: "笔",
				intro: {
					name: "买笔",
					name2: "笔",
					content: "你有【笔】！有#个！",
				},
				audio: 1,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				forced: false,
				trigger: {
					player: "phaseDrawBefore",
				},
				filter(event, player) {
					return player.countCards("h") > 0;
				},
				derivation: ["lihun"],
				async content(event, trigger, player) {
					player.chat('求求了～');
					trigger.cancel();
					const ct = player.countCards("h");
					player.discard(player.getCards("h"));
					player.addMark("maibi", ct + 2);
					player.gain(lib.card.ma.getMa(1), "gain2");
					player.addTempSkills(["lihun"]);
					player.turnOver();
				},
			},
			remaibi: {
				marktext: "笔",
				intro: {
					name: "买笔",
					name2: "笔",
					content: "你有【笔】！有#个！",
				},
				audio: 1,
				trigger: {
					global: "phaseBefore",
					player: "enterGame",
				},
				forced: false,
				trigger: {
					player: "phaseDrawBefore",
				},
				filter(event, player) {
					return player.countCards("h") > 0;
				},
				derivation: ["lihun", "rebiyue"],
				async content(event, trigger, player) {
					player.chat('求求了～');
					trigger.cancel();
					const ct = player.countCards("h");
					player.discard(player.getCards("h"));
					player.addMark("maibi", ct + 2);
					player.draw()
					player.addTempSkills(["lihun", "rebiyue"]);
					player.turnOver();
				},
				group: ["bi_effect"],
				subSkill: {
					bi_effect: {
						audio: "maibi",
						trigger: {
							global: ["phaseDrawBegin2"],
						},
						forced: true,
						filter(event, player) {
							return event.player.hasMark("nzry_huaiju") && (event.name == "damage" || !event.numFixed);
						},
						async content(event, trigger, player) {
							player.line(trigger.player, "green");
							if (player.countMark("maibi") > 4)
								trigger.num += player.countMark("maibi") - 4;
						},
					},
				}
			},
			debi: {
				skillAnimation: true,
				animationColor: "thunder",
				audio: 1,
				derivation: ["jieyin", "shaobi"],
				unique: true,
				juexingji: true,
				//priority:10,
				forced: true,
				trigger: { player: "phaseZhunbeiBegin" },
				filter: function (event, player) {
					return player.countMark("maibi") >= 6 && !player.storage.debi;
				},
				content: function () {
					"step 0";
					player.awakenSkill("debi");
					player.loseMaxHp();
					player.sex = "female";
					"step 1";
					player.draw(2);
					player.hp += 1;
					"step 2";
					player.addSkills(["jieyin", "shaobi"]);
					player.storage.debi = 1
				},
			},
			redebi: {
				skillAnimation: true,
				animationColor: "thunder",
				audio: 2,
				derivation: ["rejieyin", "reshaobi"],
				unique: true,
				juexingji: true,
				//priority:10,
				forced: true,
				trigger: { player: "phaseZhunbeiBegin" },
				filter: function (event, player) {
					return player.countMark("maibi") >= 6 && !player.storage.debi;
				},
				content: function () {
					"step 0";
					player.awakenSkill("debi");
					player.loseMaxHp();
					player.sex = "female";
					"step 1";
					player.draw(2);
					player.hp += 1;
					"step 2";
					player.addSkills(["rejieyin", "reshaobi"]);
					player.storage.debi = 1
				},
			},
			shaobi: {
				audio: 2,
				enable: "phaseUse",
				filter: function (event, player) {
					return game.hasPlayer(function (current) {
						return current.hp > 0 && current.hp < player.countMark("maibi");
					});
				},
				position: "he",
				filterTarget: function (card, player, target) {
					return target.hp > 0 && player.countMark("maibi") > target.hp;
				},
				content: function () {
					target.damage("fire");
					let ct = target.hp + 1;
					if(ct < 3) ct = 3;
					player.removeMark("maibi", ct);
				},
				ai: {
					damage: true,
					order: 1,
					result: {
						player: 1,
						target: function (player, target) {
							return get.damageEffect(target, player);
						},
					},
				}
			},
			reshaobi: {
				audio: 2,
				enable: "phaseUse",
				filter: function (event, player) {
					return game.hasPlayer(function (current) {
						return current.hp > 0 && current.hp < player.countMark("maibi");
					});
				},
				position: "he",
				filterTarget: function (card, player, target) {
					return target.hp > 0 && player.countMark("maibi") > target.hp;
				},
				content: function () {
					let dmg = 1;
					const shp=target.hp;
					if (target.countCards("h") <= 0) dmg++;
					target.damage("fire", dmg);
					let lf = shp - target.hp;
					let ct = target.hp + 1;
					if(ct < 3) ct = 3;
					if(lf > 1) ct += lf - 1;
					if (ct > player.countMark("maibi")) player.removeMark("maibi");
					player.removeMark("maibi", ct);
				},
				ai: {
					damage: true,
					order: 1,
					result: {
						player: 1,
						target: function (player, target) {
							return get.damageEffect(target, player);
						},
					},
				}
			},
			jingshi: {
				group: ["jingshi_tao", "jingshi_recover"],
				derivation: ["benghuai"],
				subSkill: {

					tao: {
						audio: 2,
						enable: "chooseToUse",
						filterCard: { name: "ma" },
						position: "hs",
						locked: false,
						viewAs: {
							name: "tao",
						},
						viewAsFilter(player) {
							if (!player.countCards("hs", "ma")) return false;
						},
						prompt: "将一张【码】当【桃】使用。",
					},
					recover: {
						audio: 2,
						trigger: { 
							player: "recoverEnd" ,
						},
						forced: true,
						content: function() {
							"step 0";
							player.draw();
							if (!player.hasSkill("benghuai")){
								player.addTempSkills("benghuai");
							}
						},
					},
				}
			},
			
			yequan: {
				group: ["yequan_ma", "yequan_max"],
				subSkill: {
					ma: {
						audio: 2,
						enable: "phaseUse",
						usable: 1,
						async content(event, trigger, player) {
							const { result } = await player.chooseNumbers(get.prompt(event.name), [{ prompt: "请选择你要失去的体力值", min: 1, max: player.getHp() * 2 }], true).set("processAI", () => {
								const player = get.player();
								let num = player.getHp() - 1;
								if (player.countCards("hs", { name: ["tao", "jiu"] })) {
									num = player.getHp();
								}
								return [num];
							});
							const number = result.numbers[0];
							await player.loseHp(number);
							await player.gain(lib.card.ma.getMa(number))
						}
					},
					max: {
						mod: {
							maxHandcardBase(player, num) {
								return 2 * player.countCards("hs", "ma");
							},
						},
					}
					
				}
			},
			vyixiang: {
				marktext: "香",
				intro: {
					name: "异香",
					name2: "香",
					content: "有#个【香】！",
					content(storage, player, skill) {
						var st;
						if (player.storage.vyixiang_prevent != true) 
							st = "阴：成为锦囊牌目标时，取消之";
						else
							st = "阳：成为基本牌目标时，取消之";
						st = "有" + (player.countMark("vyixiang") - 1) + "个【香】！\n" + st + (player.countMark("vyixiang") > 2 ? "，失去一点体力" : "。");
						return st;
					},
				},
				group: ["vyixiang_init", "vyixiang_prevent"],
				audio: 2,
				subSkill: {
					init: {
						trigger: {
							global: "gameStart"
						},
						forced: true,
						content: function() {
							player.addMark("vyixiang");
							console.log(player.countMark("vyixiang"));
						}
					},
					prevent: {
						zhuanhuanji: true,
						marktext: "☯",
						trigger: {
							target: "useCardToBegin",
						},
						forced: true,
						filter: function (event, player) {
							if (event.card) {
								if(get.type(event.card) == (player.storage.vyixiang_prevent ? "basic" : "trick"))
									return true;
							}
						},
						content: function () {
							player.changeZhuanhuanji("vyixiang_prevent");
							trigger.cancel()
							player.addMark("vyixiang");
							if(player.storage.vyixiang_prevent)
								player.draw();
							else
								player.gain(lib.card.ma.getMa(1));
							if (player.countMark("vyixiang") >= 4){
								player.loseHp();
							}
						},
						ai: {
							effect: {
								target(card, player, target) {
									if(get.type(card) != (player.storage.vyixiang_prevent ? "basic" : "trick")) return;
									if (player.countMark("vyixiang") >= 3) return -1;
									return .5;
								},
							},
						}
					}
				}
			},
			vbihuo: {
				mark: true,
				unique: true,
				enable: "phaseUse",
				skillAnimation: true,
				animationColor: "thunder",
				derivation: ["vjuxiang"],
				filter: function (event, player) {
					if( player.countMark("vyixiang") > 1 && !player.storage.vbihuo) return true;
				},
				content: function() {
					"step 0";
					player.awakenSkill("vbihuo");
					player.addSkills("vjuxiang");
					player.chat('错了');
					"step 1";
					let ct = player.countMark("vyixiang") - 1;
					player.removeMark("vyixiang", ct);
					player.recover(ct);
					player.draw(ct);
					player.storage.vbihuo = true;
					
				},
				ai: {
					order: 1,
					result: {
						player(player) {
							return (get.recoverEffect(player) + get.effect(target, { name: "draw" }, player, player)) * (player.countMark("vyixiang") - 1) + 8;
						},
					},
				},
			},
			vjuxiang: {
				mark: true,
				zhuanhuanji: true,
				marktext: "☯",
				enable: "phaseUse",
				usable: 2,
				audio: 2,
				derivation: ["new_reyaowu", "rechanyuan"],
				filter: function(event, player) {
					if (player.storage.vjuxiang != true && player.countMark("vyixiang") <= 3) return false;
					if (player.storage.vjuxiang == true && player.countCards("h", "ma") < 2) return false;
					return true;
				},

				intro: {
					content(storage, player, skill) {
						if (player.storage.vjuxiang != true) 
							return "转换技，出牌阶段限两次，你弃置3枚【香】，回复一点体力，选择一名有手牌的角色，若如此做，你弃置其一张手牌牌，其视为拥有技能【耀武】直到其下个准备阶段开始";
						return "转换技，出牌阶段限两次，你弃置随机2张【码】，失去一点体力，选择一名有手牌的角色，若如此做，其获得技能【缠怨】直到其下个结束阶段开始";
					},
				},
				content: function() {
					"step 0"
					player.changeZhuanhuanji("vjuxiang");
					var target = undefined;
					"step 1"
					player.chooseTarget("选择一名有手牌的角色", function (card, player, target) {
						if (player == target) return false;
						return target.countCards("h") > 0;
					}).set("ai", function (target) {
						return get.attitude(_status.event.player, target);
					});
					"step 2"
					if(result.bool){
						target = result.targets[0];
					} else return ;
					if (player.storage.vjuxiang == true) {
						player.removeMark("vyixiang", 3);
						if(target != undefined){
							for(let x = 0; x < 1; x++)
								if(target.getCards("h").length){
									var card = target.getCards("h").randomGet();
									target.discard(card);
								}
							if (!target.hasSkill("new_reyaowu"))
								target.addTempSkills("new_reyaowu", "phaseZhunbeiBegin");
						}
						player.recover(1);
					}else{
						player.discard(player.getCards("h", "ma").randomGet())
						player.discard(player.getCards("h", "ma").randomGet())
						if(target != undefined){
							if(target.maxHp > target.hp)
							target.loseMaxHp(1);
							if (!target.hasSkill("rechanyuan"))
								target.addTempSkills("rechanyuan", "phaseJieshuBegin");
						}
						player.loseHp(1);
					}
				},
				ai: {
					damage: true,
					order: 9,
					threaten: 1.5,
					expose: 0.3,
				},
			},
			tangren: {
				audio: 2,
				forced: true,
				group: ["tangren_draw"],
				trigger: { player: "useCardAfter"},
				filter: function(event, player) {
					return player.countCards("h") > 0;
				},
				content: function* (event, map) {
					var player = map.player;
					var trigger = map.trigger;
					let card = player.getCards("h").randomGet();
					if(player.hasUseTarget(card)){
						var ress = yield player.chooseButton(["是否使用" + get.translation(card) + "?", [card]]).set("ai", 
							button => _status.event.player.getUseValue(button.link) + 1 - 5 * (player.hasSkill("feiti") && player.countCards("h") == 1));
						var res = ress.bool;
						console.log(res);
					}else 
						var res = false;
					if (res) {
						game.delayx();
						player.chooseUseTarget(true, card, false);
					}else{
						player.discard(card);
						player.damage(1);
					}
					if(player.hasSkill("mayu_global")) player.draw();
				},
				subSkill: {
					draw: {
						trigger: {
							player: "phaseDrawBegin"
						},
						forced: true,
						content: function(){
							player.draw(2);
						}
					}
				}
			},
			feiti: {
				audio: 2,
				forced: true,
				usable: 1,
				trigger: { player: "damageBegin"},
				filter: function(event, player) {
					return player.countCards("h") == 0;
				},
				content: function* (event, map) {
					var player = map.player;
					var trigger = map.trigger;
					trigger.cancel();
					player.draw(1);
					"step 1";
					var result = yield player.chooseTarget(true, "令一名角色受到一点伤害").set("ai", function (target) {
						return 11 - get.attitude(_status.event.player, target);
					});
					"step 2";
					if(result.bool) {
						var target = result.targets[0];
						player.line(target, "green");
						target.damage();
					}
				}
			},
			lunzheng: {
				audio: 2,
				enable: "phaseUse",
				trigger: {
					player: "damageAfter"
				},
				position: "he",
				usable: 2,
				selectCard: 1,
				filter: function(event, player){
					return player.countCards("he") > 1;
				},
				viewAs: {
					name: "fudichouxin",
				},
				viewAsFilter: function(player){
					return player.countCards("he") > 1;
				},
				derivation: [],
				group: ["lunzheng_cmp"],
				filterCard: true,
				subSkill: {
					cmp: {
						audio: 1,
						forced: true,
						trigger: {
							player: "compare",
							target: "compare",
						},
						filter: function (event, player) {
							if (event.player == player && event.iwhile) return false;
							return true;
						},
						async content(event, trigger, player) {
							let at = 3 * (player.maxHp - player.hp);
							if (player == trigger.player) trigger.num1 = Math.min(trigger.num1 + at, 13)
							else trigger.num2 = Math.min(trigger.num2 + at, 13);
							game.log(player, "的拼点牌点数+", at);
						},
					}
				},
				content: function () {
					"step 0";
					player.chooseCardTarget({
						prompt: get.prompt("lunzheng"),
						position: "he",
						filterTarget: function (card, player, target) {
							return player.canUse({ name: "fudichouxin" }, target);
						},
					});
					"step 1";
					if (result.bool) {
						player.useCard({ name: "fudichouxin" }, result.cards, result.targets);
					}
				},
			},
			wuli: {
				audio: 2,
				trigger: {
					target: "useCardToBegin",
				},
				forced: true,
				filter: function (event, player) {
					if (event.card && event.card.name == "sha") return true;
				},
				content: function () {
					trigger.cancel()
					player.gain(lib.card.ma.getMa(1));
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (card.name == "sha") return "zeroplayertarget";
						},
					},
				},
			},
			mayu: {

				subSkill: {
					damage: {
						forced: true,
						trigger: { player: "damageBefore" },
						content: function() {
							"step 0"
							if(!player.countCards("h")) event.finish();
							player.discard(player.getCards("h").randomGet())
							trigger.cancel()
						}
					},
					recover: {
						forced: true,
						trigger: { player: "recoverBefore" },
						content: function() {
							"step 0"
							player.draw()
							trigger.cancel()
						}
					},
					hp: {
						forced: true,
						trigger: { player: "phaseDrawAfter", global: "gameStart" },
						content: function(){
							let amh = player.countCards("h", {name:"ma"}) + 1 - player.maxHp;
							if(amh > 0) player.gainMaxHp(amh)
							else player.loseMaxHp(-amh);
							player.hp = player.maxHp;
							player.loseHp(1)
						},
						mod: {
							maxHandcard: function (player, num) {
								return num + player.countCards("h", {name: "ma"});
							},
						},
					},
					global: {
						group: ["mayu_damage", "mayu_recover", "mayu_hp"]
					},

				},
				forced: true,
				trigger: { global: "gameStart" },
				content: function(){
					var players = game.filterPlayer();
					player.line(players)
					for(var x = 0; x < players.length; x++){
						players[x].gain(lib.card.ma.getMa(Math.round(players[x].maxHp / 2 + players[x].hp / 2)))
						players[x].addSkills("mayu_global");
					}
					player.gain(lib.card.ma.getMa(2));
					game.broadcastAll(function () {
						lib.inpile.add("ma");
					});
					game.cardsGotoPile(lib.card.ma.getMa(80), () => {
						return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
					});
				}
			},
			kuaizai: {
				usable: 1,
				enable: "phaseUse",
				content: function(){
					"step 0"
					player.chooseTarget();
					"step 1"
					if(result.bool){
						let target = result.targets[0];
						let amh = target.countCards("h", {name:"ma"}) + 1 - target.maxHp;
						if(amh > 0) target.gainMaxHp(amh)
						else target.loseMaxHp(-amh);
						target.hp = target.maxHp;
						target.loseHp(1)
					}
				}
			},
			mashen: {
				marktext: "码",
				intro: {
					name: "码神",
					content: "剩余发动次数：#",
				},
				filter: function(event, player){
					return player.countMark("mashen") > 0;
				},
				enable: "phaseUse",
				content: function* (event, map){
					var player = map.player;
					var trigger = map.trigger;
					var cards = [];
					for (var i in lib.card){
						if(player.countCards("hej", lib.card[i]) > 0) continue;
						var card = game.createCard(i, "spade", 8, "kami");
						if(get.type(card) != "basic"&&get.type(card) != "trick"&&get.type(card) != "delay"&&get.type(card) != "equip") continue;
						if(get.type(card) == "equip"&&Math.random() < .2) continue;
						card.destroy = "discardPile";
						cards.push(card)
					}
					var rcards = []
					for(var i = 0; i < 12; i++){
						rcards.push(cards.randomGet())
					}
					if(!cards.length) event.finish();
					var result = yield player.chooseButton("选择获得一张牌", [rcards], true, function(button){
						return get.value(button.link);
					});
					if(result.bool){
						player.gain(result.links[0]);
					}else event.finish();
					player.removeMark("mashen")
				},
				subSkill: {
					add: {
						forced: true,
						trigger: {player: "phaseUseBegin"},
						content: function(){
							player.addMark("mashen", Math.min(5, player.hp));
						}
					},
					del: {
						forced: true,
						trigger: {player: "phaseUseEnd"},
						content: function(){
							player.removeMark("mashen", 5);
						}
					}
				},
				group: ["mashen_add", "mashen_del"],
				ai: {
					basic: {
						order: 1,
						value: 9999,
					},
					effect: {
						target: 5,
					}
				}
			},
			jiamei: {
				marktext: "寐",
				intro: {
					name: "假寐",
					content: "当前有#个寐",
				},
				trigger: { global: "gameStart"},
				content: function(){
					player.addMark("jiamei", 3);
				},
				forced: true,
				subSkill: {
					damage: {
						forced: true,
						trigger: { player: "damageBefore"},
						content: function(){
							if(player.countMark("jiamei") > 0) player.removeMark("jiamei", 1);
							if(player.countCards("h") > 0) player.discard(player.getCards("h").randomGet());
							trigger.num = Math.max(0, trigger.num - player.countMark("jiamei"));
						}
					},
					draw: {
						forced: true, 
						trigger: { player: "phaseDrawAfter"},
						content: function(){
							player.draw(2)
							player.chooseToDiscard("h", player.countMark("jiamei"), true);
						}
					},
					max: {

						mod: {
							maxHandcard(player, num) {
								return player.countMark("jiamei") + num;
							},
						}
					}
				},
				group: ["jiamei_damage", "jiamei_draw", "jiamei_max"],
			},
			lushen: {
				subSkill: {
					add: {
						forced: true,
						trigger: {global: "gameStart"},
						content: function(){
							game.broadcastAll(function () {
								lib.inpile.add("caochuan");
							});
							game.cardsGotoPile(game.createCard("caochuan"), () => {
								return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
							});
						}  
					},
					mark: {
						marktext: "🦌",
						intro: {
							name: "鹿神",
							content: function(storage, player, skill) {return "你可以将" + (4 - player.countMark("jiamei")) + "张牌当作【草船借箭】使用"},
						},
						forced: true,
						trigger: { global: "roundStart" },
						content: function(){
							player.removeMark("lushen_mark", 1);
							player.addMark("lushen_mark", 1);
						}
					},
					caochuan: {
						enable: ["chooseToUse"],
						selectCard: function () {
							var player = _status.event.player;
							return 4 - player.countMark("jiamei")
						},
						position: "h",
						viewAs: {name: 'caochuan'},
						filterCard: true,
						filter: function(event, player){return player.countCards("h") >= 4 - player.countMark("jiamei")},
					},
				},
				group: ["lushen_add", "lushen_mark", "lushen_caochuan"],
			},
			zuofu: {
				enable: "phaseUse",
				filter: function(event, player){
					return player.countCards("h") + 2 * Math.min(5, player.maxHp) >= (game.countPlayer() - 1) * Math.max(player.countMark("jiamei"), 1)
				},
				content: function*(){
					player.loseHp()
					player.draw(2 * Math.min(5, player.maxHp))
					var targets = game.filterPlayer();
					targets.sortBySeat(_status.currentPhase);
					targets.remove(player);
					for (var x = 0; x < targets.length; x++){
						var target = targets[x];
						player.chooseToGive(target, true, Math.max(player.countMark("jiamei"), 1), "h")
						player.line(target)
						target.turnOver()
					}
				},
				ai: {
					basic: {
						order: 10,
					},
				}
			},
			jiuyao: {
				mark: true,
				zhuanhuanji: true,
				marktext: "☯",
				enable: "phaseUse",
				usable: 1,
				audio: 2,
 
				intro: {
					content(storage, player, skill) {
						if (player.storage.jiuyao != true) 
							return "转换技，出牌阶段限一次，你受到九点伤害并获得一张【械】";
						return "转换技，出牌阶段限一次，你摸九张牌并失去一点体力";
					},
				},
				content: function() {
					"step 0"
					player.changeZhuanhuanji("jiuyao");
					"step 1"
					if(!player.storage.jiuyao) {
						player.draw(9);
						player.loseHp()
					}else{
						player.damage(9);
						player.gain(lib.card.mxie.getXie(1))
					}
				},
				ai: {
					damage: true,
					order: 9,
					threaten: 1.5,
					expose: 0.3,
				},
			},
			jmoxie: {
				group: ["zhuge_skill", "guanshi_skill", "cixiong_skill", "wuxinghelingshan_skill", "zhangba_skill", "qilin_skill","qinggang_skill", "guding_skill"],
				derivation: ["zhuge_skill", "guanshi_skill", "cixiong_skill", "wuxinghelingshan_skill", "zhangba_skill", "qilin_skill","qinggang_skill", "guding_skill"],
				forced: {
					priority: Infinity,
					mod: {
						attackRange: () => 9,
					},
				},
				trigger: {"player": "damageBefore"},
				content: function(){
					if(player.hujia > 0)
						trigger.num = Math.min(trigger.num, player.hujia)
				}
			},
			xiejia: {
				derivation: ["jmoxie"],
				trigger: {player: "phaseZhunbeiBegin" },
				forced: true,
				content: function(){
					player.addTempSkills("jmoxie", "phaseZhunbeiBegin")
				},
				subSkill: {
					skip: {
						trigger: {player: "phaseDrawBegin"},
						forced: true,
						content: function(){
							trigger.cancel()
							player.gain(lib.card.mxie.getXie(2))
						}
					}
				},
				group: ["xiejia_skip"]
			},
			stdjingshi: {
				enable: "chooseToUse",
				position: "hs",
				usable: 1,
				prompt: function(){
					var player = _status.event.player;
					return "将" + Math.max(1, player.maxHp - player.hp) + "张牌当作【酒】使用"
				},
				selectCard: function(){
					var player = _status.event.player;
					return Math.max(1, player.maxHp - player.hp);
				},
				filterCard: true,
				viewAs: {name: "jiu"},
				viewAsFilter: function(player){
					return player.countCards("hs") >= Math.max(1, player.maxHp - player.hp);
				}
			},
			stdyequan: {
				enable: "phaseUse",
				usable: 1,
				content: function(){
					var hp = player.hp;
					player.draw(2);
					player.loseHp(hp);
					player.recover(hp);
				},
				ai: {
					basic: {
						order: 10,
						value: 10,
					},
					result: {
						player: function(player, target){
							return (player.countCards("hs", "jiu") + player.countCards("hs", "tao") > 0) * 102 - 100
						},
					}
				}
			},
			stdyixiang: {
				marktext: "香",
				intro: {
					name: "异香",
					intro: "已使用过#张【无懈可击】"
				},
				enable: "chooseToUse",
				position: "hesx",
				filterCard: true,
				selectCard: function(){
					var player = _status.event.player;
					return player.countMark("stdyixiang") + 1;
				},
				viewAs: {name: "wuxie"},
				viewAsFilter: function(player){
					return player.countCards("hejsx") >= player.countMark("stdyixiang") + 1;
				},
				subSkill: {
					wuxie: {
						trigger: {player: "useCard"},
						forced: true,
						filter(event, player) {
							return event.card.name == "wuxie";
						},
						content: function(){
							player.addMark("stdyixiang")
						}
					}
				},
				group: ["stdyixiang_wuxie"]
			},
			stdmizong: {
				trigger: {player: "useCardAfter"},
				forced: true, 
				filter(event, player) {
					return event.card.name == "wuxie";
				},
				content: function*(event, map){
					var player = map.player;

					var result = yield player.chooseBool("是否获得一名角色的一张手牌？", function(){
						return 1 - 10 * (player.countMark("stdyixiang") > 2);
					})
					if(result.bool){
						var result2 = yield player.chooseTarget(1, true, function(target){ return 11 + get.attitude(target) - 100 * (target == player)});
						if(result2.bool && result2.targets[0] != player){
							let card = result2.targets[0].getCards("h").randomGet();
							result2.targets[0].discard(card);
							player.gain(card);
							player.line(result2.targets)
						}
					}else player.removeMark("stdyixiang", player.countMark("stdyixiang"))
				}
			},
			stdshenru: {
				trigger: {player: "phaseUseBegin"},
				forced: true,
				filter: function(event, player){
					var targets = game.filterPlayer();
					targets.remove(player);
					for(var x = 0; x < targets.length; x++)
						if(targets[x].countCards("h") > 0) return true;
					return false;
				},
				content: function*(event, map){
					var player = map.player;
					var targets = game.filterPlayer();
					targets.remove(player);
					var ntargets = [];
					for(var x = 0; x < targets.length; x++)
						if(targets[x].countCards("h") > 0)
							ntargets.push(targets[x]);
					var tarres = yield player.chooseTarget(ntargets, true);
					var target = tarres.targets[0];
					player.line(target);
					var card = target.getCards("h").randomGet();
					target.discard(card);
					player.gain(card);

					if(player.hasUseTarget(card)){
                        var ress = yield player.chooseButton(["是否使用" + get.translation(card) + "?", [card]]).set("ai", 
                            button => _status.event.player.getUseValue(button.link) + 1 - 5 * (player.hasSkill("feiti") && player.countCards("h") == 1));
                        var res = ress.bool;
                    }else 
                        var res = false;
                    if (res) {
                        game.delayx();
                        player.chooseUseTarget(true, card, false);
                    }

					target.useCard({name: "sha"}, player, true);
				}
			},
			stdjujian: {
				subSkill: {
					sha: {
						usable: 1,
						forced: true,
						trigger: {target: "useCardToBegin"},
						filter: function(event, player){
							return event.card.name == "sha" && player.countCards("hes", {type: "equip"}) > 1;
						},
						content: function(){
							player.chooseToDiscard("hes", {type: "equip"}, 2, true);
							trigger.cancel();
						}
					},
					shan: {
						usable: 1,
						forced: true,
						trigger: {player: "useCardBegin"},
						filter: function(event, player){
							return event.card.name == "shan";
						},
						content: function(){
							player.draw(3);
							player.loseHp();
							trigger.cancel();
						}
					}
				},
				group: ["stdjujian_sha", "stdjujian_shan"]
			},
			nishui: {
				marktext: "谁",
				intro: {
					name: "你谁",
					content: "已使用过【你谁】。"
				},
				forced: true,
				trigger: {target: "useCardToBegin"},
				usable: 1,
				filter: function(event, player){
					if(event.targets.length > 1) return true;
					return false;
				},
				content: function(){
					trigger.cancel();
					player.addMark("nishui");
				},
				subSkill: {
					gain: {
						trigger: {global: "phaseAfter"},
						forced: true,
						content: function(){
							if(player.countMark("nishui") > 0) player.removeMark("nishui", player.countMark("nishui"))
							else {player.draw(); };
						}
					}
				},
				group: ["nishui_gain"]
			},
			bulai: {
				forced: true, 
				trigger: {player: "phaseUseBegin"},
				filter: function(event, player){
					return game.countPlayer() > player.maxHp - player.hp + 1;
				},
				content: function*(event, map){
					let trigger = map.trigger;
					let player = map.player;
					trigger.cancel();
					if(player.countCards("h") == 0) return;
					let result = yield player.chooseCard("使用一张牌", "h");
					if(result.bool && player.hasUseTarget(result.cards[0])){
                        player.chooseUseTarget(true, result.cards[0], false);
					}else{
						player.gain(lib.card.ma.getMa())
					}
					let result2 = yield player.chooseCard({
						prompt: "是否扣置牌？",
						selectCard: function(){
							return [0, player.hp];
						}, 
						position: "hes"
					});
					var cards = result2.cards;
					player.addToExpansion(cards, "giveAuto", player).gaintag.add("bulai2");
					player.addSkill("bulai2");

				}
			},
			bulai2: {
				trigger: { global: "phaseEnd" },
				forced: true,
				audio: false,
				sourceSkill: "bulai",
				content: function () {
					var cards = player.getExpansions("bulai2");
					if (cards.length) player.gain(cards, "draw");
					player.removeSkill("bulai2");
				},
				intro: {
					name: "不",
					mark: function (dialog, storage, player) {
						var cards = player.getExpansions("bulai2");
						if (player.isUnderControl(true)) dialog.addAuto(cards);
						else return "共有" + get.cnNumber(cards.length) + "张牌";
					},
					markcount: "expansion",
				},
			},
			xiaoxue: {
				trigger: { player: "useCardAfter"},
				filter: function(event, player){
					return true;
				},
				usable: 1,
				forced: true,
				content: function() {
					player.addTempSkills("xiaoxue_nouse");
					player.recover();
				},
				subSkill: {
					gain: {
						forced: true,
						trigger: { player: "useCard1"},
						forced: true,
						usable: 10, 
						filter: function(event, player){
							return true;
						},
						content: function(){
							player.draw()
						}
					},
					recover: {
						trigger: { player: "recoverAfter" },
						forced: true, 
						filter: function(event, player){
							return true;
						},
						content: function(){
							player.gainMaxHp()
						}
					},
					nouse: {
						forced: true,
						mod: {
							cardEnabled2(card, player) {
								if (get.position(card) == "h") return false;
							},
						},
					},
				},
				group: ["xiaoxue_gain", "xiaoxue_recover", "xiaoxue_erec"],
			},
			yima: {
				usable: 1,
				trigger: { player: ["phaseDrawBefore", "phaseDrawAfter"] },
				filter: function(event, player){
					return player.countCards("h") > 0;
				},
				content: function() {
					let cnt = player.countCards("h");
					player.discard(player.getCards("h"));
					player.gain(lib.card.ma.getMa(cnt + 2));
					if(cnt > 3){
						player.recover()
						player.gainMaxHp()
					}
				}
			},
			jinpei: {
				trigger: { player: "phaseDrawAfter"},
				filter: function(event, player){
					return player.countCards("h") > 0;
				},
				derivation: ["shence", "yizan_use", "relonghun", "dczhangcai"],
				content: function*(event, map){
					let player = map.player;
					let result = yield player.judge(function(card){
						let cards = player.getCards("h")
						for(var x = 1; x < cards.length; x++){
							if(get.type(cards[x]) != get.type(cards[x - 1])) return false;
						}
						return 10 * (get.type(cards[0]) == get.type(card));
					})
					let card = result;
					let cards = player.getCards("h")
					console.log(card, get.type(card))
					let f = true;
					for(var x = 1; x < cards.length; x++){
						if(get.type(cards[x]) != get.type(cards[x - 1])) f = false;
					if(get.type(cards[0]) == get.type(card) && f && get.type(card) == "basic")
						player.addTempSkill("shence", { player: "phaseBegin" })
					else if(get.type(card) == "basic")
						player.addTempSkill("yizan_use", { player: "phaseBegin" })
					else if(get.type(card) == "trick")
						player.addTempSkill("relonghun", { player: "phaseBegin" })
					else 
						player.addTempSkill("dczhangcai", { player: "phaseBegin" })

				}
			}

			},
			touyuan: {
				trigger: { player: "phaseZhunbeiBegin"},
				filter: function(event, player){
					return 1;
				},
				content: function*(event, map) {
					let player = map.player;
					let f = 1;
					let cards = player.getCards("h");
					for(var i = 1; i < cards.length; i++)
					if(get.color(cards[i - 1]) != get.color(cards[i])) f = 0;
					var result = yield player.judge(function(card){
						return 10 * (get.color(card) == get.color(cards[0])) * f;
					})
					game.delay();
					player.gain(result)
					if(get.color(result) == get.color(cards[0]) && f){
						let result2 = yield player.chooseControl("ma", "dian")
						.set("ai", event => {
							if(player.countCards("he", "ma") > player.countCards("he", "dian")) return "ma";
							return
						})
						.set("prompt", "选择获得的牌");
						if(result2.control == "ma") player.gain(lib.card.ma.getMa(4));
						else player.gain(lib.card.dian.getDian(4));
						let result3 = yield player.chooseControl("prog", "elec")
						.set("ai", event => {
							if(player.countCards("he", "ma") > player.countCards("he", "dian")) return "prog";
							return "elec"
						})
						.set("prompt", "是否切换势力？");
						console.log(result3.control);
						player.group = result3.control;

					}
				},
				subSkill: {
					gain: {
						enable: "phaseUse",
						usable: 3,
						filter: function(event, player){
							return true;
						},
						content: function(){
							"step 0"
							player.judge(function(card){
								return 2 * ((player.group == "prog" && get.color(card) == "red") || (player.group == "elec" && get.color(card) == "black"));
							})
							"step 1"
							if(result.color == "red") player.gain(lib.card.ma.getMa());
							else player.gain(lib.card.dian.getDian());

						}
					}
				},
				group: ["touyuan_gain"]
			},
			mayi: {
				subSkill: {
					gain: {
						trigger: { player: "useCard" },
						forced: true,
						popup: false,
						marktext: "忆",
						intro: {
							name: "码忆",
							content: "已使用过#次。"
						},
						filter: function(event, player){
							return event.skill == "mayi1" || event.skill == "mayi2" || event.skill == "mayi3" || event.skill == "mayi4";
						},
						content: function(){
							player.addMark("mayi_gain", 1);
						}
					},
					end: {
						forced: true,
						trigger: { player: "phaseEnd" },
						filter: function(event, player){
							return player.countMark("mayi_gain") > 0;
						},
						content: function() {
							player.draw(player.countMark("mayi_gain"));
							player.removeMark("mayi_gain", player.countMark("mayi_gain"));
						}
					}
				},
				filter: function(event, player){
					return player.group == "prog";
				},
				group: ["mayi1", "mayi2", "mayi3", "mayi4", "mayi_gain", "mayi_end"],
			},
			mayi1: {
				position: "he",
				filterCard: { name: "ma" },
				viewAs: { name: "fudichouxin" },
				usable: 1,
				selectCard: 1,
				enable: "chooseToUse",
				sourceSkill: "mayi",
				viewAsFilter(player) {
					return player.countCards("he", "ma") >= 1 && player.group == "prog";
				},
				prompt: "将1张【码】当作【釜底抽薪】使用"
			},
			mayi2: {
				position: "he",
				filterCard: { name: "ma" },
				viewAs: { name: "zhujinqiyuan" },
				usable: 1,
				selectCard: 2,
				enable: "chooseToUse",
				sourceSkill: "mayi",
				viewAsFilter(player) {
					return player.countCards("he", "ma") >= 2 && player.group == "prog";
				},
				prompt: "将2张【码】当作【逐近弃远】使用"
			},
			mayi3: {
				position: "he",
				filterCard: { name: "ma" },
				viewAs: { name: "chuqibuyi" },
				usable: 1,
				selectCard: 3,
				enable: "chooseToUse",
				sourceSkill: "mayi",
				viewAsFilter(player) {
					return player.countCards("he", "ma") >= 3 && player.group == "prog";
				},
				prompt: "将3张【码】当作【出其不意】使用"
			},
			mayi4: {
				position: "he",
				filterCard: { name: "ma" },
				viewAs: { name: "gz_guguoanbang" },
				usable: 1,
				selectCard: 4,
				enable: "chooseToUse",
				sourceSkill: "mayi",
				viewAsFilter(player) {
					return player.countCards("he", "ma") >= 4 && player.group == "prog";
				},
				prompt: "将4张【码】当作【固国安邦】使用"
			},
			lingdian: {
				enable: "phaseUse",
				filter: function(event, player){
					return player.group == "elec";
				},
				usable: 2,
				selectCard: [1, Infinity],
				filterCard: { name: "dian" },
				content: function*(event, map){
					let player = map.player;
					let cnt = event.cards.length;
					player.discard(event.cards);
					let result = yield player.chooseTarget([1, cnt]);
					let targets = result.targets;
					for(var i = 0; i < targets.length; i++){
						let target = targets[i];
						player.line(target);
						target.chooseToGive(player, true, 1, "h");
						if (!target.isLinked()) target.link();
					}
				},
				subSkill: {
					thunder: {
						trigger: {player: "phaseDrawBegin"},
						filter: function(event, player){
							return player.group == "elec";
						},
						prompt: "跳过摸牌阶段，造成雷电伤害",
						content: function(){
							"step 0"
							trigger.cancel();
							player.chooseTarget(true, true);
							"step 1"
							if(result.bool){
								let target = result.targets[0];
								player.line(target);
								target.damage(1, "thunder");
							}
						}
					}
				},
				group: ["lingdian_thunder"],
			},
			pengji: {
				usable: 3,
				forced: true,
				trigger: { player: "useCard1" },
				filter: function(event, player){
					return player.countCards("h") > 0;
				},

				content: function* (event, map) {
					let player = map.player;
					let result = yield player.chooseTarget({
						selectTarget: 1,
						filterTarget: function (card, player, target) {
							if (player == target) return false;
							return true;
						},
					});
					let target = result.targets[0];
					target.draw();
					let result2 = yield player.chooseToCompare(target);
					if(result2.bool)
						player.chooseToDiscard("he", 1, true);
					else
						player.damage(1);
				},
			},
			kuangnu: {
				forced: true,
				audio: 2,
				trigger: {
					player: ["chooseToCompareAfter", "compareMultipleAfter"],
					target: ["chooseToCompareAfter", "compareMultipleAfter"],
				},
				derivation: ["reweimu"],
				content: function () {
					if (player == trigger.player) {
						if (trigger.num1 <= trigger.num2) player.draw(3)
						else player.recover()
					} else {
						if (trigger.num1 >= trigger.num2) player.draw(3)
						else player.recover()
					}
				},
				subSkill: {
					achieve: {
						trigger: { player: "dying" },
						forced: true,
						animationColor: "thunder",
						skillAnimation: true,
						unique: true,
						content: function() {
							"step 0"
							player.awakenSkill("kuangnu")
							player.addTempSkill("reweimu")
							player.removeSkill("kuangnu")
							player.recover(1)
							"step 1"
							let targets = game.filterPlayer();
							targets.remove(player);
							player.line(targets);
							for(var i = 0; i < targets.length; i++)
								targets[i].turnOver();
						}
					},
					fail: {
						trigger: { player: "loseAfter" },
						forced: true,
						animationColor: "thunder",
						skillAnimation: true,
						filter: function(event, player){
							return player.countCards("h") == 0;
						},
						content: function(){
							player.die();
						}
					}
				},
				group: ["kuangnu_achieve", "kuangnu_fail"],
			}
			
		},
		translate: {
			std_kampui: "标锦培",
			std_kampui_prefix: "标",
			std_jinye: "标京爷",
			std_jinye_prefix: "标",
			std_vika: "标维卡",
			std_vika_prefix: "标",
			re_kampui: '界锦培',
			re_kampui_prefix: "界",
			kampui: '锦培',
			sb_kampui: '谋锦培',
			jinye: "京爷",
			wilson: "唐将军",
			albert: "王子真",
			sb_kampui_prefix: '谋',
			shen_kampui: "神锦培",
			shen_austin: "神舰艇",
			shen_austin_prefix: "神",
			klpig: "KLPIG大蛇",
			shen_kampui_prefix: "神",
			stdfengtian: "奉天",
			stdfengtian_info: "当一名角色的判定牌生效前，你可以观看牌堆顶的牌，你选择：1.以此牌代替判定牌作为判定结果；2.你获得判定牌。",
			stdhongtu: "宏图",
			stdhongtu_info: "出牌阶段开始时或当你受到伤害后，你可以选择一张手牌并进行判定，若结果：均为黑色：你视为使用【逐近弃远】；均为红色：你视为使用【刮骨疗毒】；不同：你失去一点体力。",
			stdshenru: "深入",
			stdshenru_info: "锁定技，出牌阶段开始时，你获得一名有手牌角色的手牌，然后其视为对你使用一张【杀】。",
			stdjujian: "巨剑",
			stdjujian_info: "锁定技，每回合各限一次，当你使用【闪】/成为【杀】的目标时，你摸3张牌然后失去一点体力/弃置2张基本牌，若如此做，你令此牌无效。",
			nishui: "你谁",
			nishui_info: "一名角色的回合共限一次：①锁定技，当你成为多目标牌的目标时，取消其对你的效果。②锁定技，回合结束时，你摸1张牌。",
			bulai: "不来",
			bulai_info: "锁定技，出牌阶段开始时，若存活人数大于你已损失的体力值+1，你跳过该阶段，并可以选择一张手牌并使用之或获得一张【码】，然后你可以将至多X张牌（X为你的体力值）移除游戏，你与回合结束获得这些牌。",
			fengtian: "奉天",
			fengtian_info: "①任意角色判定前，你令你的所有【鬼才】失效；②任意角色的判定牌生效前，你亮出牌堆顶的X+1张牌（X为你已损失体力值）称为【天】，若你有技能【鬼才】，你可以获得一名角色的一张牌加入【天】；若你有技能【源码】，你在【天】中加入一张【码】。然后你可以选择一张【天】作为此次判定的结果，若如此做，你获得剩余的随机一张【天】(如有）。",
			hongtu: "宏图",
			hongtu_info: "每回合限一次，你的准备阶段或当你受到伤害后，你可以令一名角色弃置一张手牌，然后你进行判定；若判定结果与其弃置手牌的：①花色相同，你选择一项：1.摸两张张牌；2.令其弃一张牌；②点数相同，你选择一项：1.回复一点体力；2.其失去一点体力；③以上条件均满足，你可以弃置一张【码】，若如此做，你选择一项：1.加一点体力上限；2.其减一点体力上限。",
			hongtu_gai: "宏图·改",
			hongtu_gai_info: "每回合限两次，你的准备阶段或当你受到伤害后，你可以令一名角色弃置一张手牌，然后你进行判定：判定结果与其弃置手牌的：①花色相同；②点数相同；③牌名相同；若以上条件满足不小于：2项：你加【码】数一半的护甲（向上取整）；3项：你获得技能【逆天】。",
			xiaoxue: "小学",
			xiaoxue_info: "①锁定技，每回合限十/一次，当你使用牌时/后，你摸一张牌/回复一点体力且本回合不能使用手牌；②当你回复体力后，你加一点体力上限。",
			jinsheng: "晋升",
			jinsheng_info: "觉醒技，准备阶段，若你未受伤：则你减一点体力上限，令一名角色将体力调整至体力值-1；然后你修改技能【宏图】。",
			nitian: "逆天",
			nitian_info: "①锁定技，当你受到伤害前，你令此伤害+1；当你受到伤害后，你进行判定，若结果为黑桃2-9，你失去一点体力；当你使用一张【闪】/【无懈可击】后，你无效之；你进行判定时，你回复所有体力，你于判定后失去等量体力；2；②觉醒技，准备阶段，你减一点体力上限，令【逆天①】失效，然后你获得技能【神策】。",
			shence: "神策",
			shence_info: "出牌阶段，你可以弃置一张【码】，视为使用任意精囊牌或基本牌（含【用间】【应变】【忠胆英杰】篇的普通锦囊牌，神【杀】除外）。",
			touyuan: "投缘",
			touyuan_info: "①准备阶段开始时，你可以进行判定并获得判定牌，然后若你的手牌颜色均相同，你获得4张【码】或【电】并可以变更势力；②出牌阶段限三次，你进行判定，若结果为黑色，你获得一张【电】；红色：你获得一张【码】。",
			mayi: "码忆",
			mayi_info: "编程势力技，①出牌阶段各限一次，你可以将【码】按以下规则使用：1张：【釜底抽薪】；2张：【弃近逐远】；3张：【出其不意】；4张：【固国安邦】；②结束阶段，你可以摸X张牌（X为你本回合使用【码忆①】的次数）。",
			mayi1: "码忆【釜】",
			mayi2: "码忆【逐】",
			mayi3: "码忆【出】",
			mayi4: '码忆【固】',
			lingdian: "灵电",
			lingdian_info: "电子势力技，①出牌阶段限2次，你可以弃置任意张【电】并选择不大于该数量的角色，这些角色依次横置并交给你一张牌；②摸牌阶段开始时，你可以跳过该阶段，对一名角色造成一点雷电伤害。",
			sp_kampui: "SP锦培",
			sp_kampui_prefix: "SP",
			sp_albert: "SP王子真",
			sp_albert_prefix: "SP",
			prog: "编程",
			prog1: "编程大蛇 1145",
			prog2: "神话编译 1919",
			prog2shen: "神话编译 1919: 神",
			prog3: "诡谋深算 1666",
			tang: "超唐者 2025",
			std_austin: "标舰艇",
			std_austin_prefix:"标",
			austin: "舰艇",
			vika: "维卡",
			re_austin: "界舰艇",
			re_austin_prefix: "界",
			maibi: "买笔",
			maibi_info: "摸牌阶段开始时，你可以弃置所有手牌，并获得X个【笔】标记（X为2+你因此弃置的牌数），若如此做，你跳过摸牌阶段，翻面，获得一张【码】并获得【离魂】直到回合结束。",
			debi: "得笔",
			debi_info: "觉醒技，准备阶段，若你的【笔】标记数量不小于6，你减一点体力上限，将性别改为女，回复一点体力，摸两张牌并获得技能【结姻】【烧笔】。",
			shaobi: "烧笔",
			shaobi_info: "出牌阶段，你可以选择一名体力值小于你【笔】数的角色，你弃置X个【笔】标记（X为1+其体力值，且至少为3），令其受到一点火焰伤害。",
			remaibi: "买笔",
			remaibi_info: "摸牌阶段开始时，你可以弃置所有手牌，并获得X个【笔】标记（X为2+你因此弃置的牌数），若如此做，你跳过摸牌阶段，翻面，摸一张牌并获得技能【离魂】【闭月】直到回合结束；你的额定摸牌数+Y（Y为你的【笔】数量-4，且至少为0）。",
			redebi: "得笔",
			redebi_info: "觉醒技，准备阶段，若你的【笔】标记数量不小于6，你减一点体力上限，将性别改为女，回复一点体力，摸两张牌并获得技能【结姻】【烧笔】。",
			reshaobi: "烧笔",
			reshaobi_info: "出牌阶段，你可以选择一名体力值小于你【笔】数的角色，你弃置X个【笔】标记（X为1+其体力值，且至少为3），令其受到一点火焰伤害；若其没有手牌，则改为其受到两点火焰伤害。你失去Y个【笔】（Y为其因此扣减的体力值-1，至多为你的【笔】数）",
			jingshi: "京势",
			jingshi_info: "①出牌阶段，你可以把【影】当作【码】使用；②锁定技，当你回复一点体力时，你摸一张牌，你获得技能【崩坏】直到回合结束。",
			yequan: "爷权",
			yequan_info: "①出牌阶段限一次，你可以失去任意点体力（至多为2X，X为你的体力值）并获得等量张【码】；②锁定技，你的手牌上限始终为2X（X为你的【码】数）。",
			yuanma: "源码",
			yuanma_info: "编程势力技，锁定技，出牌阶段，若你手牌中含有的【码】数不小于以下数目，你获得以下技能：2:【奇才】；5:【英姿】；8:【鬼才】；10:【帷幕】。",
			vyixiang: "异香",
			vyixiang_info: "锁定技，转换技，当你成为阴：普通锦囊牌；阳：基本牌的目标时，取消其对你的效果，你获得一枚【香】标记并获得一张【码】；然后若你的【香】标记不小于3，你失去一点体力。",
			vbihuo: "避祸",
			vbihuo_info: "限定技，出牌阶段，你可以移去所有【香】，增加等量体力上限，回复等量体力并摸等量张牌，然后你获得技能【巨香】。",
			vjuxiang: "巨香",
			vjuxiang_info: "转换技，出牌阶段限两次，选择一名有手牌的角色，若如此做：阴：你弃置3枚【香】，回复一点体力，依次弃置其两张手牌，其视为拥有技能【耀武】直到其下个准备阶段开始；阳：你随机弃置两张【码】，失去一点体力，其将体力上限改为其当前体力值（至多以此法失去一点体力上限），并获得技能【缠怨】直到其下个结束阶段开始。",
			tangren: "唐人",
			tangren_info: "①锁定技，摸牌阶段开始时，你摸2张牌；②锁定技，当你使用牌时，你随机展示一张手牌，由你选择：1.使用之；2.弃置之，然后受到一点伤害。③当你发动【唐人】后，若你受【码域】影响，你摸一张牌。",
			feiti: "飞踢",
			feiti_info: "锁定技，每回合限1次，当你受到伤害时，若你没有手牌，你防止之，摸1张牌，然后选择一名角色造成一点伤害。",
			lunzheng: "论政",
			lunzheng_info: "每回合限2次，出牌阶段或你受到伤害后，你可以将一张牌当作【釜底抽薪】使用；锁定技，你拼点时，你的点数+3X（X为你损失的体力值）",
			wuli: "无理",
			wuli_info: "锁定技，当你成为【杀】的目标时，取消之并获得一张【码】。",
			mayu: "码域",
			mayu_info: "锁定技，游戏开始时，你将40张【码】加入游戏，所有玩家立即根据其体力值获得【码】，一名角色受到伤害/回复体力时，改为随机弃置/摸等量的手牌/牌；一名角色的摸牌阶段结束后，其将体力上限/体力值改为其【码】数+1/+0。",
			kuaizai: "快载",
			kuaizai_info: "出牌阶段限一次，你令一名角色将体力上限/体力值改为其拥有的【码】数+1/0。",
			mashen: "码神",
			mashen_info: "回合内限X次（X为你的体力值,至多为五），出牌阶段开始时，你可以由随机12张神属性的基本/锦囊/装备牌中选择一张并获得。",
			jiamei: "假寐",
			jiamei_info: "①锁定技，游戏开始时，你获得3个【寐】标记。②锁定技，当你受到伤害时，若你有【寐】/手牌，你弃置一个【寐】/一张随机手牌，然后你令伤害值-X（X为你的【寐】数）。③摸牌阶段结束后，你摸两张牌，然后弃置X张手牌。④你的手牌上限+X。",
			lushen: "鹿神",
			lushen_info: "①锁定技，游戏开始时，你将一张【草船借箭】加入牌堆；②你可以将X张手牌（X为4-【寐】数）当作【草船借箭】使用。",
			zuofu: "作父",
			zuofu_info:"出牌阶段限一次，你可以失去一点体力，摸2X张（X为你的体力上限，至多为5）牌，然后你交给每名角色各Y张牌（Y为你的【寐】数，至少为1），然后其翻面。",
			yima: "忆码",
			yima_info: "你的回合限一次，摸牌阶段开始或结束时，你可以弃置所有手牌并获得等量+2的【码】，若你以此法弃置了大于3张牌，你回复一点体力并加一点体力上限。",
			jinpei: "今沛",
			jinpei_info: "摸牌阶段结束时，你可以进行判定，若结果满足以下条件，你视为拥有以下技能直到你的下个回合开始：与你的手牌均为基本牌：【神策】，否则：为基本牌：【翊赞】；普通锦囊牌：【龙魂】；其他：【彰才】。",
			khari: "黄+Ray",
			jiuyao: "玖壹",
			jiuyao_info: "转换技，出牌阶段限一次，阴：你受到九点伤害，获得一张【械】；阳：你摸九张牌，失去一点体力。",
			jmoxie: "魔械",
			jmoxie_info: "锁定技，当你受到伤害时，若你有护甲，你令伤害值至多为你的护甲数。锁定技，你使用【杀】无次数限制，无视目标防具。你可以把两张手牌当作【杀】使用或打出。当你使用非神【杀】指定任意目标时，你可将此【杀】改为任意属性，若目标为异性，你可以令其选择1.弃置一张牌；2.令你摸一张牌。若你使用【杀】被其他角色使用【闪】抵消后，你可以弃置两张牌令次【杀】依旧造成伤害。当你使用【杀】造成伤害后，你可弃置目标的一张坐骑牌，且锁定技，若其没有手牌，此伤害+1。",
			xiejia: "械甲",
			xiejia_info: "准备阶段开始时，若你有护甲，你获得技能【魔械】直到你的下个准备阶段开始。摸牌阶段，若你没有护甲，则你跳过此阶段并获得两张【械】。",
			pengji: "抨击",
			pengji_info: "锁定技，你的回合限三次，当你使用牌后，你选择一名其他角色，其摸一张牌并进行拼点，若你没赢：则你受到一点伤害，否则你弃一张牌。",
			kuangnu: "狂怒",	
			kuangnu_info: "使命技，当你拼点没赢时，你摸3张牌，否则你回复一点体力；成功：你进入濒死状态，你失去该技能，回复一点体力并令所有其他角色翻面，获得技能【不来】；失败：你失去最后一张手牌，你死亡。",

			stdjingshi: "京势",
			stdjingshi_info: "出牌阶段限一次，你可以把X张牌当作【酒】使用（X为你已损失的体力值且至少为1）。",
			stdyequan: "爷权",
			stdyequan_info: "出牌阶段，你可以失去所有体力并摸两张牌，然后你回复等量体力。",
			stdyixiang: "异香",
			stdyixiang_info: "你可以把X+1张牌当作【无懈可击】使用（X为你使用过的【无懈可击】数）",
			stdmizong: "迷踪",
			stdmizong_info: "锁定技，当你使用【无懈可击】时，你选择一项：1.获得一名角色一张牌；2.重置【异香】。",
			zsh: "小学生",
			ma: "码",
			ma_info: "【码】不得被使用或打出；\n【码】离开当前区域后，将该【码】移除游戏。",
			mxie: "械",
			elec: "电子",
			mxie_info: "出牌阶段限一次，对自己使用【械】，目标角色增加一点护甲;\n【械】离开当前区域后，将该【械】移除游戏。",
			dian: "电",
			n309: "无业",
			dian_info: "出牌阶段限一次，对任意角色使用【电】，目标角色受到2点雷电伤害然后回复2点体力，最后使用者失去一点体力;\n【电】离开当前区域后，将该【电】移除游戏。",
			mech: "机械",
			johnson: "叫恩森",
			shihong: "湿洪江",
			fengp: "KLPIG 爽玩",
			idk: "我不认识（",
			sp309: "同名异势 9191",
			"#maibi1": "这个给你～",
			"#maibi2": "求求了～",
			"#debi1": "传来，巴扬骑上马～",
			"#debi2": "我有了！",
			"#shaobi1": "师傅，别搞～",
			"#shaobi2": "Master, don't do it~",
		},
		characterSort: {
			c309: {
				fengp: ["std_kampui", 'std_austin', 'std_vika', "std_jinye"],
				prog2: ["kampui", "austin", "jinye", "vika", "klpig"],
				prog2shen: ["shen_kampui", "shen_austin"],
				tang: ["wilson", "albert"],
				idk: ["shihong", "zsh"],
				sp309: ["sp_kampui", "sp_albert"],
				prog3: ["re_kampui", "re_austin", "sb_kampui"],
			},
		},

		characterIntro: { 
			std_kampui: "锦培，永远的神。",
			std_austin: "舰艇，309人，热爱【笔】。",
			kampui: "锦培，永远的神。",
			re_kampui: "锦培，永远的神。",
			sb_kampui: "锦培，永远的神。",
			austin: "舰艇，309人，热爱【笔】。",
			jingye: "AUV，是京爷！"
		 },

		pinyins: {
			std_kampui: "kam pui"
		},
	};
});


