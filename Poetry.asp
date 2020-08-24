<!--#include virtual=/PageHeader.asp-->

<%
dim IsOneLiner, POS(6), Poetry, Parts, i

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' WritePoem
sub WritePoem
	dim Lines, Poem, Sonnet, Verse, Word, i, z

	if IsOneLiner then
		Lines = 1
	else
		Lines = int(12 * rnd + 1)
	end if
	Poem = ""
	
	for z = 1 to Lines
		Sonnet = int((ubound(Poetry) + 1) * rnd)
		for i = 1 to len(Poetry(Sonnet))
			Verse = instr(1, Parts, mid(Poetry(Sonnet), i, 1), 1) - 1
			Word = POS(Verse)(int((ubound(POS(Verse)) + 1) * rnd))
			Poem = Poem & Word & " "
		next
		if z < Lines then
			Poem = Poem & "<br>"
		end if
		if Lines > 5 and rnd > 1 - 1 / Lines then
			Poem = Poem & "<br>"
		end if
	next
	
	Poem = replace(Poem, "_", " ")
	Response.Write(Poem)
end sub

'###################################################################################
'###################################################################################

IsOneLiner = (Request.QueryString("OL") = "1")

POS(0) = split("absence absinthe acid affair afflatus alien anemone angel animosity aperture apocalypse apple apprentice aquarius argot aries arm arrow arsenal artichoke astrologer astrology attitude autumn bagpipe balloon banana banshee barber_shop_quartet barn bear bee bell beneficence bete_noire bird black_light blizzard boar boat body body_of_evidence bonhomie book bottle boy bread broom brothel bug butterfly campaign canard cancer candle candy cant capricorn captain car carmelite_nun castle cat category caterpillar cavil ceremony chain chain_gang chaos charybdis chastisement cheese chocolate choler cigarette cloud clubhouse cocoon coincidence committee compilation compunction computer consequence constitutional corncob corpse cotton_candy cross-stitch cynosure dawn daylight demon detritus dharma dictator discharge divorce dodecahedron dog dogma donut doomsday dork dragon dream drum dusk earth eclipse egg el_ni&ntilde;o elephant encyclopedia enemy entropy eye factory fairy family fantasy farrago fascist fear fire fish flare flower fog foot fop foreigner fork frisson fromage frontal_lobe fruit frying_pan fungus galaxy game gemini generosity gewgaw gimcrack giraffe girl gorilla government grape gullet hair halo hammerhead_shark hand hayloft head headache heart helicopter hobson's_choice hog hole horoscope horticulture horus house hurricane husband ice imbalance imbroglio interdimensional_vortex international_corporation island jazz_singer job journey kangaroo karma king knife lamprey land_of_nod larch largess laser lassitude leg lemon leo levity libra light lightning lightswitch lime lingerie lothario m&ouml;bius mail male man mango marriage marrow mass_murderer meatball mechanism medicine melon mercenary metamorphosis mind minotaur miscreant missile monkey morning mountain music nadir nation needle nemesis new-ager night nipple ocean ogre oracle orange orifice palimpsest panoply paradise passport pentameter performance perjury photon piano pill pilot pineapple pisces planet platypus pollution population power prefecture president prestidigitation priest probity prostitute psychology_student pumpkin queen radar radiation ratiocination real_estate red_herring redneck region regurgitation relationship relief religion respite rice ritual river rocket sadness sagittarius sang-froid scarab school_bus science scorpio scylla seagull septuagenarian sex shark-fin_soup ship sinecure snow soldier_of_fortune soul space-time_continuum spatula speaker sphincter sphinx sponge spoon spring star statue stereo storm strawberry student submarine summer syringe tarot taurus tea tchotchke temperature tendency tesseract thought thunder time toaster tornado tortellini torus town tree trinket trumpet tumor typhoon tyrannosaurus_rex underwear unicorn urchin urethra vacuum vainglory valley vegetable viaduct viagra viagra_banshee virgo volcano war water website wench wife wind winter witch woman wormwood worship xylophone zebra zenith zephyr zygote", " ")
POS(1) = split("abandons abuses aches achieves acquires activates admires advises alienates alleviates analyzes animates argues arises ascends asks asphyxiates augments augurs avoids awakens balances barks beats beckons beguiles beheads belches bestows betrays births blesses bores bribes brightens brushes builds burns calms caramelizes cares caresses categorizes chokes circumvents clarifies collaborates comes commands compels comports condemns conducts constricts consummates contaminates controls converses conveys cooperates corrupts creates criticizes cuts deceives declaims defends defenestrates degrades demands denies denounces descends descries despises dies digs disavows discharges disclaims disembowels disregards dissolves dives divorces doubts drenches drinks drowns dyes eats eliminates elucidates embues encourages engulfs enhances enjoys entices envelops equivocates eradicates erupts eschews espies evolves exacerbates exorcises expatiates expels extracts exudes falsifies fans feeds flares flies focuses follows foretells forgets fornicates fumigates furnishes gags gainsays gesticulates gorges gratifies groans grows hallucinates harasses hassles hates hears heralds hinders hits hops hugs illuminates inflames instigates inures inveighs irradiates jumps kicks kisses laughs leads learns licks listens loves masturbates meanders meditates melts mutilates nourishes obeys obfuscates observes obtains opposes ostracizes overdoses overshadows packs paints performs perjurs perpetuates personifies peruses plagiarizes plays polarizes polishes portends portrays praises pretends procrastinates prognosticates propels prophesies propounds pukes punctures purges purifies purrs pursues quaffs questions quizzes rattles reads reanimates recites recognizes refutes regrets relaxes relieves renders renounces repairs resolves retaliates reveals runs sacrifices saves segues shovels shows sings sinks smokes sodomizes speaks stabs steals stigmatizes stings stinks strikes strives struggles studies sucks sunders supersedes swallows swims terminates thinks undulates upholds urinates verifies walks wanders waters weathers weaves weighs writes yells", " ")
POS(2) = split("abusive accidental aching acidic acquiescent acrid ad_hoc alabaster analog anal-retentive antiquated aquatic arcane archaic arid aromatic asinine assiduous atomic audacious authoritarian autoerotic balanced banal beautiful benign black blessed blind bloody blue boring bovine bulbous burned callous canine cantankerous captious carcinogenic caustic cellular censorious cerulean chary child-like chocolate clamorous clenched clinquant cold compulsive contemporaneous coy daedal dark dead dead-end demure depressed deranged derisive detached dictatorial digital disemboweled disquieting drunk dry egotistical egregious elated electronic emaciated embarrassed emotional enigmatic enlightened epileptic equestrian erratic establishmentarian eternal ethereal euphoric exclusive exuberant extraordinary fanciful farcical fat faustian feline fetid fin_de_siecle flabbergasted flammable fluorescent foppish foreign frightened frivolous frustrating fugacious fulsome funny galactic galvanized gaudy generic generous glittering gloating global golden grandiose green grey grief-filled guerilla guilty heterophobic heterosexual high hilarious holy homosexual homophobic horny hostile hot ignorant ill imaginary immortal impermanent impetuous inconsequential incorporeal indomitable ineffable inept infinite infinitesimal innocent intangible intelligent intractable inveterate iridescent irrelevant irritating jagged jocund lachrymose laconic large lascivious latent lonely loquacious loud lovely lucid lupine magnificent majestic malignant mandatory masturbatory meaningless meek melancholy mellifluous mendacious metaphysical meticulous milky mischievous monotheistic mystical mythical na&iuml;ve nascent nebulous never-ending nonsensical nuclear nurturing obsequious obsessive off-center omnipotent omnipresent omniscient orange ordinary orgasmic orgiastic overwhelming pathetic peculiar pedantic pejorative petty philosophical pink platonic plenary polished political politically-correct pompous porcine pornographic posthumous premature premenstrual prepubescent pretty primal primordial pristine propagandistic protean pungent purple putrid quick quondam racist radical radioactive rancid rebarbative red redundant relentless revolutionary ridiculous rotten rough sad sadomasochistic sanguine saturated scientific secluded sentimental servile sexy silver simple sincere smooth sobering social solar somnolent sordid spasmodic splendid steady stellar stentorian stolid stoned strange stunning stupid subatomic subcutaneous subterranean suicidal supercilious superfluous talented tasty tautological thin thoughtless timid tinseled torrid toxic transitory trivial truculent tyrannical ugly unanimous unaware uneventful universal unmitigated unnecessary unorthodox unpredictable unreliable unusual ursine useless venial venomous verbose violent vociferous warm well-meaning wet white worthless yellow", " ")
POS(3) = split("accidentally acquiescently affectionately alarmingly anonymously apologetically arrogantly assuredly authoritatively beautifully bitingly blatantly blindly brazenly busily carefully carelessly caressingly cautiously ceremoniously charmingly cleanly complacently condescendingly congenially conscientiously cooperatively courageously cruelly curiously defensively deliberately disparagingly ecstatically efficiently effortlessly elaborately emotionally erratically fanatically fastidiously frightfully generously gracefully graciously gratefully grudgingly haphazardly happily harshly hopelessly humanely humbly hypocritically hypothetically impetuously inadvertently intelligently irreverently joyfully laughingly lazily leisurely lovingly merrily methodically meticulously mindlessly mournfully nervously painfully parenthetically pathetically peacefully permanently plainly playfully positively purposefully quickly randomly rapidly relentlessly resoundingly rhetorically rhythmically romantically sadly safely sarcastically satisfactorily seamlessly sinfully slowly softly spontaneously steadily strongly subserviantly successfully superciliously surreptitiously sweetly tactfully tenaciously thoroughly thoughtfully thoughtlessly tirelessly triumphantly unabashedly unanimously unenthusiastically unerringly unknowingly unscrupulously viscerally vociferously warily warmly", " ")
POS(4) = split("also and because but except except_for for hence nevertheless or since so then therefore thus until when where while yet", " ")
POS(5) = split("about above according_to across after against along along_with among apart_from around as_for at away_from before behind below beneath beside between beyond but by by_means_of close_to concerning despite down during except far_from for from in in_between in_front_of in_lieu_of inside into like near next_to of off on on_account_of onto out out_of outside over past regarding since through throughout to toward under underneath until up up_to upon with within without", " ")
POS(6) = split("he she it someone no_one everyone everybody nobody", " ")

Poetry = split("nva jnavn jnavpncvpn nnvcnva nvpjnn nvcnv nvcqv ajnavcv nv nvn jnvcnv nnvcqv nvpn nvpjn jnavpn", " ")
Parts = "nvjacpq"

PageHeader null, null, null
StyleSheet "Poetry"
%>

<table border=0 cellspacing=0 cellpadding=0>
	<tr>
		<td valign=top><span class=Poem><nobr>
			<span class=Subheader>
				Richard Brunson's
			</span><br>
			<span class=Header>
				<%
				if IsOneLiner then
					%>
					Random One-Liners
					<%
				else
					%>
					Random Poetry
					<%
				end if
				%>
			</span><br>
			<hr noshade size=2 color=ff00ff><p>
			
			<% WritePoem %>
		</nobr></span></td>
	</tr>
</table><br>

<%
PageFooter
%>

<!--#include virtual=/PageFooter.asp-->
