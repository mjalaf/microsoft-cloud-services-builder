function getIndex(): number
{ 
	const min = Math.ceil(0);
	const max = Math.floor(1000);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

export const util = {
    getIndex
};