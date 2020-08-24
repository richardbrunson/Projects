using System;
using System.Collections.Generic;
using System.Text;

namespace qgen1
{
	public class Namer
	{
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		enum NameType
		{
			Person,
			Place
		}

		enum NamePart
		{
			Prefix,
			Suffix
		}

		enum FullNameType
		{
			Male,
			Female,
			Surname
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// constant and static objects
		static Random RandomNumber;

		const string Vowels = "aeiou";
		static readonly int VowelsLength = Vowels.Length;
		const string Consonants = "bcdfghjklmnpqrstvwxyz";
		static readonly int ConsonantsLength = Consonants.Length;

		static int FullNameTypeLength;
		static Dictionary<FullNameType, string[]> FullNames;
		static Dictionary<NameType, Dictionary<NamePart, string[]>> NameParts;
		static string[] UndesirablePhrases;

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		public string ProperName
		{
			get
			{
				StringBuilder name = new StringBuilder();
				int partCount;
				int partCountLimit;
				int i;

				switch ( RandomNumber.Next( 6 ) )
				{
					case 0:
						name.Append( Global.Name.PrefixSuffix( NameParts[ NameType.Place ][ NamePart.Prefix ], NameParts[ NameType.Place ][ NamePart.Suffix ] ) );
						break;

					case 1:
						switch ( RandomNumber.Next( 8 ) )
						{
							case 0:
							case 1:
								partCount = 1;
								break;
							case 2:
								partCount = 3;
								break;
							default:
								partCount = 2;
								break;
						}
						partCountLimit = partCount - 1;

						string prefix;
						for ( i = 0; i < partCount; ++i )
						{
							prefix = Global.Name.RandomValue( NameParts[ NameType.Person ][ NamePart.Prefix ] );
							name.Append( prefix );
							if ( RandomNumber.Next( 12 ) == 0 && i < partCountLimit )
							{
								name.Append( "'" );
							}
						}

						break;

					case 2:
						string randomName;
						bool hasUndesirablePhrase;

						do
						{
							name.Length = 0;
							hasUndesirablePhrase = false;
							partCount = RandomNumber.Next( 2, 6 );
							partCountLimit = partCount - 1;

							bool isVowel = ( RandomNumber.Next( 2 ) == 0 );
							for ( i = 0; i < partCount; ++i )
							{
								if ( isVowel )
								{
									name.Append( Vowels.Substring( RandomNumber.Next( VowelsLength ), 1 ) );
									if ( RandomNumber.Next( 16 ) == 0 )
									{
										name.Append( Vowels.Substring( RandomNumber.Next( VowelsLength ), 1 ) );
									}
								}
								else
								{
									name.Append( Consonants.Substring( RandomNumber.Next( ConsonantsLength ), 1 ) );
									if ( RandomNumber.Next( 20 ) == 0 && i > 0 )
									{
										name.Append( Consonants.Substring( RandomNumber.Next( ConsonantsLength ), 1 ) );
									}
								}
								isVowel = !isVowel;

								if ( RandomNumber.Next( 24 ) == 0 && i < partCountLimit )
								{
									name.Append( "'" );
								}
							}

							randomName = name.ToString();
							foreach ( string phrase in UndesirablePhrases )
							{
								if ( randomName.Contains( phrase ) )
								{
									hasUndesirablePhrase = true;
									break;
								}
							}
						}
						while ( hasUndesirablePhrase );

						break;

					default:
						name.Append( Global.Name.RandomValue( FullNames[ (FullNameType) RandomNumber.Next( FullNameTypeLength ) ] ) );
						break;
				}

				return name.ToString();
			}
		}

		public string FullProperName
		{
			get
			{
				return ProperName + " " + ProperName;
			}
		}

		public string PlaceName
		{
			get
			{
				switch ( RandomNumber.Next( 8 ) )
				{
					case 0:
					case 1:
						return Global.Name.PersonsPlace( ProperName, NameParts[ NameType.Place ][ NamePart.Suffix ] );

					case 2:
						return Global.Name.PlaceOfPerson( NameParts[ NameType.Place ][ NamePart.Suffix ], ProperName );

					case 3:
						string prefix;
						string suffix;
						string value;
						do
						{
							prefix = Global.Name.RandomValue( NameParts[ NameType.Place ][ NamePart.Prefix ] );
							suffix = Global.Name.RandomValue( NameParts[ NameType.Place ][ NamePart.Suffix ] );
						}
						while ( prefix == suffix );
						do
						{
							value = Global.Name.RandomValue( NameParts[ NameType.Place ][ NamePart.Suffix ] );
						}
						while ( value == prefix || value == suffix );

						return prefix + suffix + " " + value;

					default:
						return Global.Name.PrefixSuffix( NameParts[ NameType.Place ][ NamePart.Prefix ], NameParts[ NameType.Place ][ NamePart.Suffix ] );
				}
			}
		}

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		public Namer()
		{
			// initialize statics on first instantiation
			if ( RandomNumber == null )
			{
				RandomNumber = Global.RandomNumber;

				// full names
				FullNameTypeLength = Enum.GetValues( typeof( FullNameType ) ).Length;
				FullNames = new Dictionary<FullNameType, string[]>();
				FullNames.Add( FullNameType.Male, new string[] { "aaron", "adrian", "alton", "andrew", "anthony", "aramil", "aust", "barendd", "bartholomew", "beau", "boddynock", "boris", "bradley", "brandon", "brian", "brottor", "cade", "carl", "cecil", "charles", "christopher", "clifford", "craig", "daniel", "darren", "darryl", "david", "dench", "dimble", "donald", "donovan", "eberk", "edward", "einkil", "eldon", "enialis", "eric", "ezekiel", "fen", "feng", "fonkin", "frank", "frederic", "gabriel", "garret", "gary", "gell", "george", "gerbo", "glen", "glim", "gordon", "graham", "grant", "gregory", "harold", "heian", "henk", "henry", "himo", "holg", "imsh", "isaac", "ivan", "ivellios", "james", "jason", "jebeddo", "jeffery", "jeremiah", "jonathan", "jordan", "joseph", "joshua", "kenneth", "keth", "kevin", "kieth", "kirk", "laucian", "leonard", "luke", "lyle", "marcus", "martin", "matthew", "maxwell", "michael", "milo", "namfoodle", "nathaniel", "oliver", "osborn", "oscar", "paul", "peter", "philip", "quarion", "quincy", "rex", "richard", "robert", "ronald", "ront", "roondar", "roscoe", "rupert", "rurik", "scott", "seebo", "shump", "simon", "spencer", "stephen", "taklinn", "thadeus", "thamior", "tharivol", "thokk", "thomas", "timothy", "traubon", "ulfgar", "veit", "victor", "wellby", "william", "xavier", "zachariah", "zeke", "zook" } );
				FullNames.Add( FullNameType.Female, new string[] { "alison", "amanda", "amaryllis", "amber", "amy", "anastrianna", "andrea", "angela", "anna", "antinua", "artin", "audhild", "baggi", "barbara", "bimpnottin", "brenda", "briana", "candice", "caramip", "caroline", "cathleen", "charmaine", "christina", "claire", "constance", "cora", "cynthia", "dagnal", "deborah", "dianna", "diesa", "donna", "dorothy", "drusilia", "duvamil", "eleanor", "elizabeth", "ellen", "ellyjobell", "ellywick", "emen", "engong", "erin", "euphemia", "felosial", "francine", "gabrielle", "grace", "gunnload", "gwenevere", "heather", "helen", "hlin", "ielenia", "ilde", "irene", "janet", "jennifer", "jessica", "jillian", "joana", "karen", "katherine", "kimberly", "laura", "laurel", "lauren", "lavinia", "leslie", "lia", "liftrasa", "linda", "lisa", "loopmottin", "lydia", "mardnab", "margaret", "martha", "mary", "melissa", "merla", "michelle", "monica", "myev", "nancy", "natalie", "neega", "ophelia", "ovak", "ownka", "paige", "pamela", "patricia", "portia", "qillathe", "rebecca", "regina", "roywyn", "ruth", "sandra", "sannl", "sarah", "sasha", "seraphina", "shamil", "sharon", "shautha", "silaqui", "stephanie", "susan", "tiffany", "torgga", "valanthe", "vanessa", "verna", "victoria", "vola", "volen", "wanda", "waywocket", "xanaphia", "yolanda", "zoe" } );
				FullNames.Add( FullNameType.Surname, new string[] { "amakiir", "amastacia", "anderson", "axel", "balderk", "beren", "billings", "boren", "brown", "brunson", "brushgather", "campbell", "clark", "cobbler", "cooper", "daergel", "dankil", "davis", "diamond", "draper", "eaton", "evans", "fenton", "fisher", "folkor", "forrest", "frost", "galanodel", "garrick", "gibson", "goodbarrel", "gorunn", "greenbottle", "harris", "highhill", "hilltopple", "holderhek", "holimion", "hollis", "ilphukiir", "ingalls", "ingram", "jackson", "johnson", "jones", "kilpatrick", "king", "kirk", "kline", "knight", "laferte", "leagallow", "leof", "lewis", "liadon", "loderr", "lutgehr", "macleod", "martin", "meliamne", "miller", "milrad", "milton", "monroe", "moore", "murnig", "nackle", "nailo", "ningel", "noble", "norlin", "oaks", "ogden", "olsen", "o'neill", "parson", "piper", "politte", "potter", "pratt", "prince", "raulnor", "richards", "robinson", "rumnaheim", "scheppen", "siannodel", "smith", "strakeln", "sullivan", "tanner", "taylor", "tealeaf", "thomas", "thompson", "thorngage", "torunn", "tosscobble", "turen", "underbough", "ungart", "vanderbilt", "vaughn", "velvet", "watts", "white", "williams", "wilson", "wolf", "xiloscient", "yard", "yarrow", "young", "zanders", "zane", "zimmerman" } );

				// name parts
				NameParts = new Dictionary<NameType, Dictionary<NamePart, string[]>>();

				NameParts.Add( NameType.Person, new Dictionary<NamePart, string[]>() );
				NameParts[ NameType.Person ].Add( NamePart.Prefix, new string[] {
						"ab", "ac", "ad", "af", "ag", "ah", "ak", "al", "am", "an", "ap", "ar", "as", "at", "av", "aw", "ax", "ay", "az", "bab", "bac", "bad", "baf", "bag", "bah", "bak", "bal", "bam", "ban", "bap", "bar", "bas", "bat", "bav", "baw", "bax", "bay", "baz", "beb", "bec", "bed", "bef", "beg", "beh", "bek", "bel", "bem", "ben", "bep", "ber", "bes", "bet", "bev", "bew", "bex", "bey", "bez", "bib", "bic", "bid", "bif", "big", "bih", "bik", "bil", "bim", "bin", 
						"bip", "bir", "bis", "bit", "biv", "biw", "bix", "biy", "biz", "bob", "boc", "bod", "bog", "boh", "bok", "bol", "bom", "bon", "bop", "bor", "bos", "bot", "bov", "bow", "box", "boy", "boz", "bub", "buc", "bud", "buf", "bug", "buh", "buk", "bul", "bum", "bun", "bup", "bur", "bus", "but", "buv", "buw", "bux", "buy", "buz", "cab", "cac", "cad", "caf", "cag", "cah", "cak", "cal", "cam", "can", "cap", "car", "cas", "cat", "cav", "caw", "cax", 
						"cay", "caz", "ceb", "cec", "ced", "cef", "ceg", "ceh", "cek", "cel", "cem", "cen", "cep", "cer", "ces", "cet", "cev", "cew", "cex", "cey", "cez", "cib", "cic", "cid", "cif", "cig", "cih", "cik", "cil", "cim", "cin", "cip", "cir", "cis", "cit", "civ", "ciw", "cix", "ciy", "ciz", "cob", "cod", "cof", "cog", "coh", "col", "com", "con", "cop", "cor", "cos", "cot", "cov", "cow", "coy", "coz", "cub", "cuc", "cud", "cuf", "cug", 
						"cuh", "cuk", "cul", "cup", "cur", "cus", "cut", "cuv", "cuw", "cux", "cuy", "cuz", "dab", "dac", "dad", "daf", "dag", "dah", "dak", "dal", "dam", "dan", "dap", "dar", "das", "dat", "dav", "daw", "dax", "day", "daz", "deb", "dec", "ded", "def", "deg", "deh", "dek", "del", "dem", "den", "dep", "der", "des", "det", "dev", "dew", "dex", "dey", "dez", "dib", "did", "dif", "dig", "dih", "dil", "dim", "din", "dip", "dir", 
						"dis", "dit", "div", "diw", "diy", "diz", "dob", "doc", "dod", "dof", "dog", "doh", "dok", "dol", "dom", "don", "dop", "dor", "dos", "dot", "dov", "dow", "dox", "doy", "doz", "dub", "duc", "dud", "duf", "dug", "duh", "duk", "dul", "dum", "dun", "dup", "dur", "dus", "dut", "duv", "duw", "dux", "duy", "duz", "eb", "ec", "ed", "ef", "eg", "eh", "ek", "el", "em", "en", "ep", "er", "es", "et", "ev", "ew", "ex", "ey", "ez", "fab", "fac", "fad", 
						"faf", "fah", "fak", "fal", "fam", "fan", "fap", "far", "fas", "fat", "fav", "faw", "fax", "fay", "faz", "feb", "fec", "fed", "fef", "feg", "feh", "fek", "fel", "fem", "fen", "fep", "fer", "fes", "fet", "fev", "few", "fex", "fey", "fez", "fib", "fic", "fid", "fif", "fig", "fih", "fik", "fil", "fim", "fin", "fip", "fir", "fis", "fit", "fiv", "fiw", "fix", "fiy", "fiz", "fob", "foc", "fod", "fof", "fog", "foh", "fok", "fol", "fom", "fon", 
						"fop", "for", "fos", "fot", "fov", "fow", "fox", "foy", "foz", "fub", "fud", "fuf", "fug", "fuh", "ful", "fum", "fun", "fup", "fur", "fus", "fut", "fuv", "fuw", "fuy", "fuz", "gab", "gac", "gad", "gaf", "gag", "gah", "gak", "gal", "gam", "gan", "gap", "gar", "gas", "gat", "gav", "gaw", "gax", "gay", "gaz", "geb", "gec", "ged", "gef", "geg", "geh", "gek", "gel", "gem", "gen", "gep", "ger", "ges", "get", "gev", "gew", "gex", 
						"gey", "gez", "gib", "gic", "gid", "gif", "gig", "gih", "gik", "gil", "gim", "gin", "gip", "gir", "gis", "git", "giv", "giw", "gix", "giy", "giz", "gob", "goc", "god", "gof", "gog", "goh", "gok", "gol", "gom", "gon", "gop", "gor", "gos", "got", "gov", "gow", "gox", "goy", "goz", "gub", "guc", "gud", "guf", "gug", "guh", "guk", "gul", "gum", "gun", "gup", "gur", "gus", "gut", "guv", "guw", "gux", "guy", "guz", "hab", "hac", "had", "haf", "hag", 
						"hah", "hak", "hal", "ham", "han", "hap", "har", "has", "hat", "hav", "haw", "hax", "hay", "haz", "heb", "hec", "hed", "hef", "heg", "heh", "hek", "hel", "hem", "hen", "hep", "her", "hes", "het", "hev", "hew", "hex", "hey", "hez", "hib", "hic", "hid", "hif", "hig", "hih", "hik", "hil", "him", "hin", "hip", "hir", "his", "hit", "hiv", "hiw", "hix", "hiy", "hiz", "hob", "hoc", "hod", "hof", "hog", "hoh", "hok", "hol", "hom", "hon", "hop", "hor", 
						"hos", "hot", "hov", "how", "hox", "hoy", "hoz", "hub", "huc", "hud", "huf", "hug", "huh", "huk", "hul", "hum", "hun", "hup", "hur", "hus", "hut", "huv", "huw", "hux", "huy", "huz", "ib", "ic", "id", "if", "ig", "ih", "ik", "il", "im", "in", "ip", "ir", "is", "it", "iv", "iw", "ix", "iy", "iz", "kab", "kac", "kad", "kaf", "kag", "kah", "kak", "kal", "kam", "kan", "kap", "kar", "kas", "kat", "kav", "kaw", "kax", "kay", "kaz", "keb", "kec", "ked", 
						"kef", "keg", "keh", "kek", "kel", "kem", "ken", "kep", "ker", "kes", "ket", "kev", "kew", "kex", "key", "kez", "kib", "kic", "kid", "kif", "kig", "kih", "kik", "kil", "kim", "kin", "kip", "kir", "kis", "kit", "kiv", "kiw", "kix", "kiy", "kiz", "kob", "koc", "kod", "kof", "kog", "koh", "kok", "kol", "kom", "kon", "kop", "kor", "kos", "kot", "kov", "kow", "kox", "koy", "koz", "kub", "kuc", "kud", "kuf", "kug", "kuh", "kuk", "kul", "kum", "kun", 
						"kup", "kur", "kus", "kut", "kuv", "kuw", "kux", "kuy", "kuz", "lab", "lac", "lad", "laf", "lag", "lah", "lak", "lal", "lam", "lan", "lap", "lar", "las", "lat", "lav", "law", "lax", "lay", "laz", "leb", "lec", "led", "lef", "leg", "leh", "lek", "lel", "lem", "len", "lep", "ler", "les", "let", "lev", "lew", "lex", "ley", "lez", "lib", "lic", "lid", "lif", "lig", "lih", "lik", "lil", "lim", "lin", "lip", "lir", "lis", "lit", "liv", "liw", "lix", 
						"liy", "liz", "lob", "loc", "lod", "lof", "log", "loh", "lok", "lol", "lom", "lon", "lop", "lor", "los", "lot", "lov", "low", "lox", "loy", "loz", "lub", "luc", "lud", "luf", "lug", "luh", "luk", "lul", "lum", "lun", "lup", "lur", "lus", "lut", "luv", "luw", "lux", "luy", "luz", "mab", "mac", "mad", "maf", "mag", "mah", "mak", "mal", "mam", "man", "map", "mar", "mas", "mat", "mav", "maw", "max", "may", "maz", "meb", "mec", "med", "mef", "meg", 
						"meh", "mek", "mel", "mem", "men", "mep", "mer", "mes", "met", "mev", "mew", "mex", "mey", "mez", "mib", "mic", "mid", "mif", "mig", "mih", "mik", "mil", "mim", "min", "mip", "mir", "mis", "mit", "miv", "miw", "mix", "miy", "miz", "mob", "moc", "mod", "mof", "mog", "moh", "mok", "mol", "mom", "mon", "mop", "mor", "mos", "mot", "mov", "mow", "mox", "moy", "moz", "mub", "muc", "mud", "muf", "mug", "muh", "muk", "mul", "mum", "mun", "mup", "mur", 
						"mus", "mut", "muv", "muw", "mux", "muy", "muz", "nab", "nac", "nad", "naf", "nag", "nah", "nak", "nal", "nam", "nan", "nap", "nar", "nas", "nat", "nav", "naw", "nax", "nay", "naz", "neb", "nec", "ned", "nef", "neg", "neh", "nek", "nel", "nem", "nen", "nep", "ner", "nes", "net", "nev", "new", "nex", "ney", "nez", "nib", "nic", "nid", "nif", "nih", "nik", "nil", "nim", "nin", "nip", "nir", "nis", "nit", "niv", "niw", "nix", "niy", "niz", 
						"nob", "noc", "nod", "nof", "nog", "noh", "nok", "nol", "nom", "non", "nop", "nor", "nos", "not", "nov", "now", "nox", "noy", "noz", "nub", "nuc", "nud", "nuf", "nug", "nuh", "nuk", "nul", "num", "nun", "nup", "nur", "nus", "nut", "nuv", "nuw", "nux", "nuy", "nuz", "ob", "oc", "od", "of", "og", "oh", "ok", "ol", "om", "on", "op", "or", "os", "ot", "ov", "ow", "ox", "oy", "oz", "pab", "pac", "pad", "paf", "pag", "pah", "pak", "pal", "pam", "pan", 
						"pap", "par", "pas", "pat", "pav", "paw", "pax", "pay", "paz", "peb", "pec", "ped", "pef", "peg", "peh", "pek", "pel", "pem", "pen", "pep", "per", "pes", "pet", "pev", "pew", "pex", "pey", "pez", "pib", "pic", "pid", "pif", "pig", "pih", "pik", "pil", "pim", "pin", "pip", "pir", "pis", "pit", "piv", "piw", "pix", "piy", "piz", "pob", "poc", "pod", "pof", "pog", "poh", "pok", "pol", "pom", "pon", "pop", "por", "pos", "pot", "pov", "pow", "pox", 
						"poy", "poz", "pub", "puc", "pud", "puf", "pug", "puh", "puk", "pul", "pum", "pun", "pup", "pur", "pus", "put", "puv", "puw", "pux", "puy", "puz", "rab", "rac", "rad", "raf", "rag", "rah", "rak", "ral", "ram", "ran", "rap", "rar", "ras", "rat", "rav", "raw", "rax", "ray", "raz", "reb", "rec", "red", "ref", "reg", "reh", "rek", "rel", "rem", "ren", "rep", "rer", "res", "ret", "rev", "rew", "rex", "rey", "rez", "rib", "ric", "rid", "rif", "rig", 
						"rih", "rik", "ril", "rim", "rin", "rip", "rir", "ris", "rit", "riv", "riw", "rix", "riy", "riz", "rob", "roc", "rod", "rof", "rog", "roh", "rok", "rol", "rom", "ron", "rop", "ror", "ros", "rot", "rov", "row", "rox", "roy", "roz", "rub", "ruc", "rud", "ruf", "rug", "ruh", "ruk", "rul", "rum", "run", "rup", "rur", "rus", "rut", "ruv", "ruw", "rux", "ruy", "ruz", "sab", "sac", "sad", "saf", "sag", "sah", "sak", "sal", "sam", "san", "sap", "sar", 
						"sas", "sat", "sav", "saw", "sax", "say", "saz", "seb", "sec", "sed", "sef", "seg", "seh", "sek", "sel", "sem", "sen", "sep", "ser", "ses", "set", "sev", "sew", "sex", "sey", "sez", "sib", "sic", "sid", "sif", "sig", "sih", "sik", "sil", "sim", "sin", "sip", "sir", "sis", "sit", "siv", "siw", "six", "siy", "siz", "sob", "soc", "sod", "sof", "sog", "soh", "sok", "sol", "som", "son", "sop", "sor", "sos", "sot", "sov", "sow", "sox", "soy", "soz", 
						"sub", "suc", "sud", "suf", "sug", "suh", "suk", "sul", "sum", "sun", "sup", "sur", "sus", "sut", "suv", "suw", "sux", "suy", "suz", "tab", "tac", "tad", "taf", "tag", "tah", "tak", "tal", "tam", "tan", "tap", "tar", "tas", "tat", "tav", "taw", "tax", "tay", "taz", "teb", "tec", "ted", "tef", "teg", "teh", "tek", "tel", "tem", "ten", "tep", "ter", "tes", "tet", "tev", "tew", "tex", "tey", "tez", "tib", "tic", "tid", "tif", "tig", "tih", "tik", 
						"til", "tim", "tin", "tip", "tir", "tis", "tit", "tiv", "tiw", "tix", "tiy", "tiz", "tob", "toc", "tod", "tof", "tog", "toh", "tok", "tol", "tom", "ton", "top", "tor", "tos", "tot", "tov", "tow", "tox", "toy", "toz", "tub", "tuc", "tud", "tuf", "tug", "tuh", "tuk", "tul", "tum", "tun", "tup", "tur", "tus", "tut", "tuv", "tuw", "tux", "tuy", "tuz", "ub", "uc", "ud", "uf", "ug", "uh", "uk", "ul", "um", "un", "up", "ur", "us", "ut", "uv", "uw", 
						"ux", "uy", "uz", "vab", "vac", "vad", "vaf", "vag", "vah", "vak", "val", "vam", "van", "vap", "var", "vas", "vat", "vav", "vaw", "vax", "vay", "vaz", "veb", "vec", "ved", "vef", "veg", "veh", "vek", "vel", "vem", "ven", "vep", "ver", "ves", "vet", "vev", "vew", "vex", "vey", "vez", "vib", "vic", "vid", "vif", "vig", "vih", "vik", "vil", "vim", "vin", "vip", "vir", "vis", "vit", "viv", "viw", "vix", "viy", "viz", "vob", "voc", "vod", "vof", 
						"vog", "voh", "vok", "vol", "vom", "von", "vop", "vor", "vos", "vot", "vov", "vow", "vox", "voy", "voz", "vub", "vuc", "vud", "vuf", "vug", "vuh", "vuk", "vul", "vum", "vun", "vup", "vur", "vus", "vut", "vuv", "vuw", "vux", "vuy", "vuz", "wab", "wac", "wad", "waf", "wag", "wah", "wak", "wal", "wam", "wan", "wap", "war", "was", "wat", "wav", "waw", "wax", "way", "waz", "web", "wec", "wed", "wef", "weg", "weh", "wek", "wel", "wem", "wen", "wep", 
						"wer", "wes", "wet", "wev", "wew", "wex", "wey", "wez", "wib", "wic", "wid", "wif", "wig", "wih", "wik", "wil", "wim", "win", "wip", "wir", "wis", "wit", "wiv", "wiw", "wix", "wiy", "wiz", "wob", "woc", "wod", "wof", "wog", "woh", "wok", "wol", "wom", "won", "wop", "wor", "wos", "wot", "wov", "wow", "wox", "woy", "woz", "wub", "wuc", "wud", "wuf", "wug", "wuh", "wuk", "wul", "wum", "wun", "wup", "wur", "wus", "wut", "wuv", "wuw", "wux", "wuy", 
						"wuz", "xab", "xac", "xad", "xaf", "xag", "xah", "xak", "xal", "xam", "xan", "xap", "xar", "xas", "xat", "xav", "xaw", "xax", "xay", "xaz", "xeb", "xec", "xed", "xef", "xeg", "xeh", "xek", "xel", "xem", "xen", "xep", "xer", "xes", "xet", "xev", "xew", "xex", "xey", "xez", "xib", "xic", "xid", "xif", "xig", "xih", "xik", "xil", "xim", "xin", "xip", "xir", "xis", "xit", "xiv", "xiw", "xix", "xiy", "xiz", "xob", "xoc", "xod", "xof", "xog", "xoh", 
						"xok", "xol", "xom", "xon", "xop", "xor", "xos", "xot", "xov", "xow", "xox", "xoy", "xoz", "xub", "xuc", "xud", "xuf", "xug", "xuh", "xuk", "xul", "xum", "xun", "xup", "xur", "xus", "xut", "xuv", "xuw", "xux", "xuy", "xuz", "yab", "yac", "yad", "yaf", "yag", "yah", "yak", "yal", "yam", "yan", "yap", "yar", "yas", "yat", "yav", "yaw", "yax", "yay", "yaz", "yeb", "yec", "yed", "yef", "yeg", "yeh", "yek", "yel", "yem", "yen", "yep", "yer", "yes", 
						"yet", "yev", "yew", "yex", "yez", "yib", "yic", "yid", "yif", "yig", "yih", "yik", "yil", "yim", "yin", "yip", "yir", "yis", "yit", "yiv", "yiw", "yix", "yiy", "yiz", "yob", "yoc", "yod", "yof", "yog", "yoh", "yok", "yol", "yom", "yon", "yop", "yor", "yos", "yot", "yov", "yow", "yox", "yoy", "yoz", "yub", "yuc", "yud", "yuf", "yug", "yuh", "yuk", "yul", "yum", "yun", "yup", "yur", "yus", "yut", "yuv", "yuw", "yux", "yuy", "yuz", "zab", 
						"zac", "zad", "zaf", "zag", "zah", "zak", "zal", "zam", "zan", "zap", "zar", "zas", "zat", "zav", "zaw", "zax", "zay", "zaz", "zeb", "zec", "zed", "zef", "zeg", "zeh", "zek", "zel", "zem", "zen", "zep", "zer", "zes", "zet", "zev", "zew", "zex", "zey", "zez", "zib", "zic", "zid", "zif", "zig", "zih", "zik", "zil", "zim", "zin", "zip", "zir", "zis", "zit", "ziv", "ziw", "zix", "ziy", "ziz", "zob", "zoc", "zod", "zof", "zog", "zoh", "zok", "zol", 
						"zom", "zon", "zop", "zor", "zos", "zot", "zov", "zow", "zox", "zoy", "zoz", "zub", "zuc", "zud", "zuf", "zug", "zuh", "zuk", "zul", "zum", "zun", "zup", "zur", "zus", "zut", "zuv", "zuw", "zux", "zuy", "zuz"
					} );
				NameParts[ NameType.Person ].Add( NamePart.Suffix, new string[] { } );
				NameParts[ NameType.Person ][ NamePart.Suffix ] = NameParts[ NameType.Person ][ NamePart.Prefix ];

				NameParts.Add( NameType.Place, new Dictionary<NamePart, string[]>() );
				NameParts[ NameType.Place ].Add( NamePart.Prefix, new string[] {
						"acid", "after", "age", "aid", "air", "ale", "angel", "apple", "arch", "arm", "arrow", "art", "ash", "autumn", "axe", "back", "bad", "badge", "bald", "ball", "bank", "bar", "bare", "bark", "barrel", "barrow", "basket", "bass", "battle", "bean", "bear", "beast", "beauty", "bee", "beer", "best", "big", "bird", "bitter", "black", "blade", "blank", "blind",
						"blood", "blue", "bluff", "boar", "board", "boat", "body", "bold", "bone", "book", "boot", "bottle", "bottom", "boulder", "bound", "bow", "bowl", "box", "boy", "brag", "branch", "brand", "brass", "breach", "bread", "break", "breeze", "brew", "brick", "bride", "bridge", "bright", "brine", "brisk", "broad", "broke", "broken", "bronze", "brook", "brother", "brown", "brush", "bucket", "buckle", "bug",
						"bull", "burn", "bush", "button", "cage", "calm", "camp", "candle", "cap", "cape", "card", "cash", "castle", "cat", "cave", "cell", "center", "certain", "chain", "chamber", "change", "charm", "cheer", "cheese", "cherry", "chess", "chest", "chief", "child", "chime", "chip", "church", "cider", "clan", "clear", "cliff", "cloak", "clock", "close", "cloth", "cloud", "club", "coal", "coat", "coil",
						"coin", "cold", "cool", "copper", "cord", "core", "cork", "corn", "corner", "count", "country", "court", "cow", "craft", "crag", "crank", "crash", "crate", "creek", "creep", "crime", "cross", "crow", "crown", "cry", "crypt", "cube", "cup", "dagger", "dam", "damp", "dank", "dark", "dawn", "day", "dead", "deep", "demon", "dew", "diamond", "dire", "ditch", "dock", "dog", "doll", "dome", "door", "double",
						"down", "draft", "drag", "dragon", "dread", "dream", "drift", "drink", "drop", "drought", "druid", "drunk", "dry", "duck", "dull", "dumb", "dune", "dungeon", "dunk", "dusk", "dust", "dwarf", "eagle", "earth", "east", "easy", "edge", "egg", "eight", "elf", "elm", "empty", "ever", "fair", "fairy", "faith", "fake", "fall", "false", "fan", "fancy", "fang", "far", "farm", "fast", "fat", "father", "fawn", "feather", "feed", "fell", "fen", "fence", "fest",
						"feud", "field", "fight", "fill", "final", "find", "fine", "finger", "fire", "first", "fish", "five", "flag", "flame", "flask", "flat", "fleece", "flood", "floor", "flower", "fly", "fog", "foil", "fold", "folk", "food", "fool", "fools", "foot", "fore", "fork", "fort", "fountain", "four", "fourth", "fox", "frail", "frank", "free", "friend", "frog", "front", "frost", "froth", "fruit", "full", "fun", "gallow", "game", "garden", "gash", "gate", "gem", "ghost", "giant", "gift", "gin", "girl", "glad", "glade",
						"glass", "glen", "glory", "glove", "glow", "glyph", "gnome", "goat", "god", "gold", "good", "goose", "grail", "grain", "grand", "grape", "grass", "grave", "great", "green", "grey", "grind", "groom", "ground", "grove", "guard", "gulp", "hag", "hail", "hair", "half", "hall", "hallow", "hammer", "hand", "happy", "hard", "harsh", "hat", "haul", "haven", "head", "health", "heart", "hearth", "heaven", "hedge", "height",
						"helm", "herb", "hide", "high", "hike", "hill", "hive", "hog", "hole", "hollow", "home", "honey", "honor", "hood", "hook", "hoop", "horn", "horse", "host", "hot", "house", "howl", "hub", "hunt", "husk", "ice", "ill", "imp", "inn", "inner", "iron", "isle", "jack", "jag", "jar", "jester", "jewel", "jig", "joy", "judge", "jump", "junk", "just", "key", "kid", "kill", "kind", "king", "kiss", "kite", "knife", "knight", "knoll", "knot", "lace", "ladder", "lady", "lair", "lake", "lamp", "lance", "land", "large",
						"last", "late", "laugh", "law", "lead", "leaf", "leap", "left", "leg", "lift", "light", "lime", "line", "lock", "lode", "log", "long", "look", "loop", "loose", "lord", "lore", "love", "low", "lower", "mace", "mad", "mage", "magic", "maid", "maiden", "mail", "main", "make", "man", "mane", "manor", "march", "mare", "mark", "marsh", "mask", "mate", "meadow", "mean", "meat", "meek", "mercy", "merry", "mesa", "mesh", "middle", "might", "mild", "milk", "mill", "mine", "mire", "mission", "mist", "mitt", "modest", "moist", 
						"money", "monk", "moon", "moor", "moss", "mother", "mound", "mount", "mouse", "mouth", "mud", "muse", "myth", "nail", "naked", "near", "nest", "net", "nether", "never", "new", "night", "nine", "noose", "north", "nose", "note", "oak", "ocean", "oil", "old", "one", "open", "orange", "orb", "orc", "ore", "out", "outer", "over", "owl", "page", "pail", "pale", "part", "pass", "path", "pawn", "peace", "peak", "pearl", "peat", "penny", "piece", "pier", "pig", "pike", "pine", "pink",
						"pit", "place", "plaid", "plain", "plank", "plate", "plot", "plow", "pocket", "point", "pond", "pool", "poor", "port", "post", "pray", "prayer", "prey", "pretty", "price", "priest", "prime", "prince", "princess", "probe", "proud", "pub", "puddle", "pure", "purple", "purse", "quad", "quaff", "quaint", "queen", "quest", "quick", "quiet", "quill", "quilt", "quiver", "rain", "ranch", "range", "rat", "raven", "red", "relic", "rest", "rich", "ridge", "right", "ring", "rise", "river",
						"road", "robe", "rock", "rod", "rogue", "roof", "roost", "rope", "rose", "rough", "round", "ruby", "rug", "ruin", "rune", "rust", "sad", "safe", "sage", "saint", "salt", "sand", "sap", "sash", "saw", "scale", "scar", "scarlet", "school", "scorn", "scotch", "scrag", "script", "scroll", "sea", "seed", "serpent", "seven", "sew", "shack", "shade", "shadow", "shaft", "shallow", "shank", "shard", "sharp", "shawl", "shed", "shelf", "shepherd", "shield", "shine", "ship", "shock", "shoe",
						"shoot", "shop", "shore", "short", "shout", "shrine", "sight", "sign", "silent", "silver", "single", "sink", "sister", "six", "skin", "skull", "sky", "slave", "sleep", "slide", "slime", "slope", "slough", "slow", "slush", "smart", "smoke", "smooth", "snake", "snow", "soft", "song", "soul", "sound", "soup", "sour", "south", "spade", "spark", "spear", "speech", "spell", "sphere", "spice", "spider", "spike", "spin", "spine", "spire", "spirit", "splint", "split", "spoke", "spore", "sport", "sprawl",
						"spread", "spring", "spruce", "square", "stable", "stack", "staff", "stair", "stake", "stand", "star", "state", "station", "statue", "steel", "steep", "steer", "stem", "step", "stern", "stew", "stick", "stiff", "still", "stock", "stone", "stop", "store", "storm", "straight", "strait", "strand", "strap", "stray", "stream", "strong", "stump", "summer", "sun", "swamp", "swarm", "sweep", "sweet", "swift", "sword", "table", "tack", "tag", "tail", "talk", "tall", "tame", "tan", "tank",
						"tap", "tar", "task", "tavern", "tear", "teeth", "temple", "ten", "thick", "thief", "thin", "thorn", "three", "thrill", "throne", "thug", "thunder", "tide", "tight", "timber", "time", "tin", "tiny", "tip", "toad", "toe", "tomb", "tome", "tongue", "tool", "tooth", "top", "torch", "torn", "touch", "tough", "tour", "tower", "town", "toy", "track", "tract", "trade", "trail", "trap", "treasure", "tree", "trick", "triple", "trove", "true", "trunk", "truth", "tube", "tunnel", "turf",
						"turn", "turtle", "two", "ugly", "under", "up", "upper", "urn", "vague", "valley", "wake", "walk", "wall", "wand", "war", "ware", "warm", "waste", "watch", "water", "way", "weak", "wealth", "web", "weed", "well", "wench", "west", "wet", "wheel", "white", "whole", "wild", "wind", "window", "wine", "wing", "winter", "wise", "witch", "wizard", "wolf", "woman", "wood", "wool", "word", "wraith", "wreck", "yellow", "yield", "zenith", "zero", "zip", "zone", "zoom"
					} );
				NameParts[ NameType.Place ].Add( NamePart.Suffix, new string[] {
						"acid", "act", "age", "air", "ale", "alp", "angel", "apple", "arch", "arm", "arms", "arrow", "art", "ash", "axe", "back", "badge", "bag", "bale", "ball", "band", "bane", "bank", "bar", "barb", "bard", "bark", "barn", "barrel", "barrow", "base", "basket", "bath", "battle", "bead", "beast", "beauty", "bed", "beer", "bell", "belt", "bet", "bill", "bird", "birth", "blade", "blank", "blast", "blaze", "bless", "blessing", "blind", "block", 
						"blood", "bluff", "board", "boat", "body", "bog", "bond", "bone", "book", "boot", "borne", "bottle", "bottom", "bough", "boulder", "bow", "bowl", "box", "boy", "branch", "brand", "brass", "breach", "bread", "break", "breeze", "brew", "brick", "bride", "bridge", "brine", "bronze", "brooch", "brood", "brook", "brother", "brush", "bucket", "buckle", "bug", 
						"build", "bull", "burgh", "burn", "burst", "bush", "butte", "button", "cache", "cage", "cake", "call", "camp", "can", "candle", "cane", "cap", "cape", "card", "care", "cart", "case", "cash", "cask", "cast", "castle", "cat", "cave", "cavern", "cell", "center", "chain", "chair", "chamber", "chance", "change", "charge", "charm", "chart", "chase", "chasm", "cheer", "chest", "chief", "child", "chime", "chip", "choice", "church", "cider", "circle", "clan", "clasp", "class", "claw", "cliff", "climb", "cloak", "clock", "cloth", "cloud", "club", "coal", "coat", "code", "coil", 
						"coin", "cone", "coop", "copper", "cord", "core", "corn", "corner", "count", "country", "court", "cow", "craft", "crag", "crank", "crash", "crate", "creek", "creep", "crest", "crime", "cross", "crow", "crown", "cry", "crypt", "cube", "cup", "curve", "dagger", "dale", "dam", "dance", "dawn", "day", "deep", "demon", "den", "depth", "dew", "diamond", "dig", "dirt", "disc", "ditch", "dock", "dog", "doll", "dome", "door", 
						"draft", "drag", "dragon", "dread", "dream", "drift", "drink", "drip", "drop", "drought", "drunk", "duck", "dune", "dungeon", "dunk", "dusk", "dust", "dwarf", "eagle", "earth", "edge", "egg", "elf", "elm", "end", "eve", "eye", "face", "fair", "fairy", "faith", "fall", "falls", "fame", "fan", "fancy", "fang", "far", "fare", "farm", "fast", "fat", "fate", "father", "fawn", "fear", "feast", "feat", "feather", "feed", "feel", "feet", "fell", "fen", "fence", "fern", "fest", 
						"feud", "field", "fight", "fill", "find", "finger", "fire", "fish", "flag", "flame", "flank", "flask", "flat", "fleece", "fleet", "float", "flood", "floor", "flow", "flower", "fly", "fog", "foil", "fold", "food", "fool", "foot", "force", "fork", "form", "fort", "fountain", "fox", "frame", "free", "friend", "frog", "front", "frost", "froth", "fruit", "gallow", "game", "gap", "garden", "gash", "gate", "gear", "gem", "ghost", "giant", "gift", "girl", "glade", 
						"glass", "gleam", "glen", "globe", "glory", "glove", "glow", "glyph", "gnome", "goat", "god", "gold", "goose", "grape", "grass", "grave", "grin", "grind", "groom", "ground", "grove", "guard", "gulch", "gulp", "hag", "hail", "hair", "half", "hall", "ham", "hamlet", "hammer", "hand", "hang", "hat", "haul", "haunt", "haven", "head", "heal", "health", "heart", "hearth", "heaven", "hedge", "height", "heights", 
						"helm", "herb", "hide", "high", "hike", "hill", "hive", "hog", "hold", "hole", "hollow", "home", "honey", "hood", "hook", "hoop", "horn", "horse", "host", "house", "howl", "hub", "hunger", "hunt", "husk", "ice", "inn", "isle", "jack", "jag", "jar", "jaunt", "jester", "jewel", "jig", "joint", "joke", "joy", "jump", "junk", "keep", "key", "kid", "kill", "king", "kiss", "kite", "knife", "knight", "knob", "knoll", "knot", "lace", "ladder", "lady", "lair", "lake", "lamp", "lance", "land", "lane", "lash", 
						"laugh", "launch", "law", "leaf", "leap", "leg", "life", "lift", "light", "line", "link", "lobe", "lock", "lode", "log", "look", "loop", "lord", "lore", "lot", "love", "lover", "luck", "mace", "mage", "magic", "maid", "maiden", "mail", "main", "make", "mane", "manor", "map", "march", "mare", "mark", "marsh", "mask", "mast", "mate", "meadow", "meal", "mercy", "mesa", "mesh", "might", "mill", "mind", "mine", "mire", "mission", "mist", "mitt", "moat", "mold", 
						"money", "monk", "moon", "moor", "morn", "moss", "mother", "mound", "mount", "mouse", "mouth", "move", "mud", "muse", "myth", "nail", "name", "neck", "nest", "net", "nether", "night", "nook", "noose", "nose", "note", "oak", "oil", "orb", "orc", "ore", "owl", "pad", "page", "pail", "paint", "palm", "park", "part", "pass", "path", "pawn", "peace", "peak", "pearl", "penny", "pick", "pie", "piece", "pier", "pig", "pike", "pine", "pipe", 
						"pit", "place", "plain", "plank", "plant", "plate", "plot", "plow", "pocket", "point", "pond", "pool", "port", "post", "prank", "pray", "prayer", "press", "prey", "price", "priest", "prince", "princess", "prose", "pub", "puddle", "pull", "pulse", "pump", "purse", "push", "quaff", "queen", "quest", "quill", "quilt", "quiver", "rain", "ranch", "range", "rat", "raven", "reach", "reed", "reef", "reign", "relic", "rest", "ridge", "ring", "rise", "river", 
						"road", "robe", "rock", "rod", "roof", "room", "roost", "rope", "rose", "ruby", "rug", "ruin", "run", "rune", "rust", "sack", "sage", "saint", "salt", "salve", "sand", "sap", "sash", "saw", "scale", "scape", "scar", "school", "scorn", "scrag", "scroll", "seed", "serpent", "sew", "shack", "shade", "shadow", "shaft", "shallow", "shank", "shape", "shard", "share", "shawl", "shed", "shelf", "shepherd", "shield", "shine", "ship", "shock", "shoe", 
						"shoot", "shop", "shore", "shout", "shrine", "sight", "sign", "silence", "silver", "sink", "sister", "site", "skill", "skin", "skull", "sky", "slash", "slave", "sleep", "slime", "slope", "slough", "slush", "smile", "smoke", "snake", "snow", "song", "soul", "sound", "soup", "spade", "span", "spark", "spear", "speck", "speech", "spell", "sphere", "spice", "spider", "spike", "spin", "spine", "spire", "spirit", "splint", "spoke", "spore", "sport", "sprawl", 
						"spread", "spring", "spruce", "square", "stable", "stack", "staff", "stair", "stake", "stand", "star", "stare", "state", "station", "statue", "stay", "steed", "steep", "steer", "step", "stew", "stick", "still", "stix", "stock", "stone", "stop", "store", "storm", "strait", "strand", "strap", "stream", "stride", "string", "strip", "stump", "summer", "sun", "swamp", "swarm", "sweep", "sword", "table", "tack", "tag", "tail", "tale", "talk", "tank", 
						"tap", "tar", "tarp", "task", "tavern", "tear", "tears", "teeth", "temple", "thief", "thirst", "thorn", "thorp", "throne", "thug", "thunder", "tide", "tie", "timber", "time", "tin", "tip", "toad", "toe", "tomb", "tome", "tone", "tongue", "tool", "tooth", "top", "torch", "toss", "touch", "tower", "town", "toy", "trace", "track", "tract", "trade", "trail", "trap", "treasure", "tree", "trick", "troop", "trough", "trove", "trunk", "truth", "tune", "tunnel", "turf", 
						"turn", "urn", "vale", "valley", "vent", "view", "ville", "wake", "walk", "wall", "wand", "war", "ware", "wart", "waste", "watch", "water", "wave", "way", "wealth", "web", "weed", "weight", "well", "wench", "wheel", "whip", "wild", "wind", "window", "wine", "wing", "winter", "wire", "wise", "witch", "wizard", "wolf", "wood", "word", "work", "world", "wort", "wraith", "wrap", "wrath", "wreck", "yield", "yoke", "yurt", "zenith", "zone"
					} );

				// undesirable words
				UndesirablePhrases = new string[] { "ars", "ass", "bastar", "ball", "bitc", "boll", "clit", "coc", "cok", "cox", "crap", "cum", "cunt", "dam", "dic", "dik", "dix", "fag", "fart", "fuc", "fudg", "fuj", "fuk", "fux", "god", "hell", "hooc", "jes", "jew", "jiz", "klit", "koc", "kok", "kox", "krap", "kum", "kunt", "lesb", "lez", "milf", "muf", "nig", "paki", "pee", "phuc", "phuk", "phux", "pis", "pric", "prik", "prix", "pus", "screw", "skrew", "shag", "shit", "slag", "slut", "smeg", "sod", "strop", "tit", "turd", "twat", "vag", "vaj", "wank", "whor" };
			}
		}
	}
}
