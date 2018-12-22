/*
file: markov2
description: Create and use an order-2 markov chain.
author: Ethan Witherington
*/

/*
EXECUTIVE SUMMARY:

Create a chain, feed it sentences, and then use the chain to make new sentences.

create_chain() => chain
merge_sentence(chain, sentence)
generate(chain) => sentence
*/

// A chain contains many states.
// Each state refers to many possible following states.

// Chain Data Structure:

/*
{
	"Word1Word2": {
		occurences: 5,
		end: 3,
		next: {
			"Word3": 1,
			"Word4": 1
		}
	}
}
*/

/*
name: create_chain
desc: Create a new chain object. This is... easy.
args: None.
returns: An empty chain.
*/
function create_chain(){
	return {};
}

/*
name: merge_sentence
desc: Add a sentence to the given chain
args:
	chain - The chain to modify
	sentence - the sentence to merge into the chain
returns: the finished chain.
*/
function merge_sentence(chain, sentence){
	// Clean the sentence:
	// 		Replace scary characters
	//  	Convert to lowercase
	// sentence = sentence.replace(/[\/\\,+()~%."?<>{}]/g, '');
	sentence = sentence.toLowerCase();
	// Split into words
	let words = sentence.split(" ");
	// console.log(words);
	// Iterate!
	// shift = pop, unshift = push
	let prepre = "<START>";
	let pre = "<START>";
	for(let i=0; i<words.length; i++){
		// Increase probability of "prepre:pre"=>words[i]
		// What is the current state?
		let current_state = prepre+pre;
		// What is the next state?
		let next_state = words[i];
		// Is the chain lacking an entry for the current state?
		if(!chain[current_state]){
			chain[current_state] = {
				"count": 0,
				"end": 0,
				"next": {}
			};
		}
		// Increment the count of the current state
		chain[current_state].count++;
		// Now, does next have an entry for the next state?
		if(!chain[current_state].next[next_state]){
			chain[current_state].next[next_state] = 0;
		}
		// Increment the count of appearances of next_state after current_state
		chain[current_state].next[next_state]++;
		// Now, change prepre and pre in preparation for the next iteration
		prepre = pre;
		pre = next_state;
	}
	// Now, increase the probability of the last two words leading to <END>
	let current_state = prepre+pre;
	// Make sure we have an entry for this combination
	if(!chain[current_state]){
		chain[current_state] = {
			"count": 0,
			"end": 0,
			"next": {}
		};
	}
	// Increment the count of the current state
	chain[current_state].count++;
	// Increment the count for ending after this current state.
	chain[current_state].end++;
	// And now, we may rest.
	return chain;
}

/*
name: generate
desc: Create a new sentence using this chain
args: chain - the chain to use
returns: the sentence that was created.
*/
function generate(chain){
	let words = ["<START>","<START>"];
	let next_word = get_next_word(chain, words);
	while(typeof(next_word)==="string"){
		words.push(next_word);
		next_word = get_next_word(chain, words);
	}
	// Remove the two start tokens.
	words.shift();
	words.shift();
	// We got words! Put them together, and capitalize the first letter.
	let sentence = words.join(" ");
	sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
	// TODO - end with a period? Exclamation mark? Hmmm...
	return sentence;
}

/*
name: get_next_word
desc: Given a bunch of words, determine what the next one should be.
args:
	chain - the chain to generate from
	words - the array of words so far
returns:
	the next word, as a string, OR
	-1 (number) if there should not be a next word.
*/
function get_next_word(chain, words){
	// Get the length of the words array
	let words_count = words.length;
	// Calculate the state at the end of the array
	let current_state = words[words_count-2] + words[words_count-1];
	let possibilities = chain[current_state];
	// Determine the index of the option to take
	let index = get_random_int(1, possibilities.count);
	// Do we take the end option?
	if(index <= possibilities.end){
		return -1;
	}
	// What option?
	let too_small = possibilities.end;
	for(let word in possibilities.next){
		let too_big = too_small + possibilities.next[word];
		if(too_small < index && index <= too_big){
			// Index matches up with this word, we found it!
			return word;
		}
		too_small += possibilities.next[word];
	}
	// If we've gotten this far without finding the answer, error!
	console.error("Error generating from chain:");
	console.error(JSON.stringify(chain, null, 4));
}


/*
name: getRandomInt
desc: Get a random integer between min and max inclusive
args:
	min - the smallest possible number
	max - the highest possible number
Returns: the random number
*/
function get_random_int(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Declare the exports.
module.exports = {
	"create_chain": create_chain,
	"merge_sentence": merge_sentence,
	"generate": generate
}
