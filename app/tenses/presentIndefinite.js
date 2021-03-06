const {
	push,
	lastLetter,
	getFirstPart,
	getLastPart,
	strInit,
	isVowel
} = require('./../methods/basics');

const {

	arrayOfPersonalSuffixes,
	get4WayHarmonyOf,
	generateResult,
	getProperties

} = require('./../methods/turkish');

// LAST CHECK 4 1 2018
const PresentIndefinite = (verb, DEFAULT = getProperties(verb)) => {

	// if it's two or MORE Words verb then we get the first part (like haskell: init part)
	// this has an space but it's not longer necessary
	let firstPart = (DEFAULT.isAuxiliaryComposedVerb) ? DEFAULT.initComposedVerb : (DEFAULT.isComposed && DEFAULT.isAuxiliaryComposedVerbInNegativeForm) ? DEFAULT.initComposedVerbInNegativeForm : (DEFAULT.isAuxiliaryComposedVerbInNegativeForm) ? DEFAULT.initComposedVerbInNegativeForm : (DEFAULT.isComposed) ? DEFAULT.initPart : '';
	// and change the default for getting the properties of the real verb, so the last part that is usually "etmek"
	DEFAULT = (DEFAULT.isAuxiliaryComposedVerb) ? getProperties(DEFAULT.auxiliaryVerb) : (DEFAULT.isComposed && DEFAULT.isAuxiliaryComposedVerbInNegativeForm) ? getProperties(DEFAULT.auxiliaryVerbInNegativeForm) : (DEFAULT.isAuxiliaryComposedVerbInNegativeForm) ? getProperties(DEFAULT.auxiliaryVerbInNegativeForm) : (DEFAULT.isComposed) ? getProperties(DEFAULT.lastPart) : DEFAULT;
	
	// Gelirmişler -> It seems they (will) come. (Parece que vienen/vendrán)
	// This use: verb root + aorist suffix + -miş- -mış- -müş- -muş + Personal Suffix I
	// for 3th person plural we use the suffix muş + lar/miş + ler... etc

	// harmonyRoot is like a default value if the conditions in aoristSuffix aren't enough
	let harmonyRoot = `${get4WayHarmonyOf(verb)}r`;

	let aoristSuffix = isVowel(lastLetter(DEFAULT.root)) ? 'r' : (DEFAULT.vowelsLength >= 2) ? harmonyRoot : (DEFAULT.vowelsLength == 1 && /[ae]/i.test(DEFAULT.verbVowels) && /[lnr]/i.test(lastLetter(DEFAULT.root))) ? harmonyRoot : (/[ie]/.test(DEFAULT.verbVowels) && lastLetter(DEFAULT.root) != 'l') ? 'er' : (DEFAULT.verbVowels == 'i') ? 'ir' : (DEFAULT.verbVowels == 'a') ? 'ar' : (DEFAULT.verbVowels == 'ü') ? 'er' : (DEFAULT.verbVowels == 'ı') ? 'ar' : (DEFAULT.verbVowels == 'o' && lastLetter(DEFAULT.root) != 'r') ? 'ur' : (DEFAULT.isSingleSyllableVerb && DEFAULT.verbSuffix == 'mek' && DEFAULT.verbVowels != 'ö') ? 'er' : (DEFAULT.isSingleSyllableVerb && DEFAULT.verbVowels == 'u' && lastLetter(DEFAULT.root) != 'y') ? 'ur' : (DEFAULT.isSingleSyllableVerb && DEFAULT.verbVowels == 'ö') ? 'ür' : (DEFAULT.isSingleSyllableVerb && DEFAULT.verbVowels == 'ü') ? 'ür' : 'ar';


	let larOrLer = `m${DEFAULT.harmony4way}şl${DEFAULT.harmony2way}r`;

	let personalSuffixes = arrayOfPersonalSuffixes.I(DEFAULT.harmony4way).map((item) => `m${DEFAULT.harmony4way}ş${item}`);

	return generateResult(push(personalSuffixes, larOrLer), firstPart, DEFAULT.root, aoristSuffix);

}

module.exports = PresentIndefinite;