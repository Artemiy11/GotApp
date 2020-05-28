export default class GotService {
    constructor() {
        this._apibase = 'https://www.anapioficeandfire.com/api/'
    }
    async getResource(url) {
        const res = await fetch(`${this._apibase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`characters?page=5`);
        return await res.map(this._transformChar)
    }

    async getCharacter(id) {
        const res = this.getResource(`characters/${id}`);
        return await this._transformChar(res);
    }

    _transformChar(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture
        }
    }

    async getAllBooks() {
        const res = await this.getResource(`books?page=5`);
        return await res.map(this._transformBook);
    }

    async getBook(id) {
        const res = await this.getResource(`books/${id}`);
        return await this._transformBook(res);
    }

    _transformBook(book) {
        return {
            name: book.name,
            publiser: book.publiser,
            numberOfPages: book.numberOfPages,
            released: book.released
        }
    }

    async getAllHouses() {
        const res = await this.getResource(`houses?page=5`);
        return await res.map(this._transformHouse);
    }

    async getHouse(id) {
        const res = await this.getResource(`houses/${id}`);
        return await this._transformHouse(res);
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons  
        }
    }
}

