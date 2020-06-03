export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    _transformHouse = (houseArr) => {

        const house = this._transformItem(houseArr);

        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons  
        }
    }

    _transformBook = (bookArr) => {

        const book = this._transformItem(bookArr);

        return {
            name: book.name,
            publisher: book.publisher,
            numberOfPages: book.numberOfPages,
            released: book.released
        }
    }

    _transformCharacter = (char) => {
        
        const obj = this._transformItem(char);

        return {
            name: obj.name,
            gender: obj.gender,
            born: obj.born,
            died: obj.died,
            culture: obj.culture
        }
    }

    _transformItem = (item) => {
        const arr = Object.entries(item);
            arr.map((item) => {
                if (item[1] == '') {
                    item[1] = 'this field is missing';
                    return item[1];
                } else {
                    return item[1];
                }
                
            })

            const obj = {};
            arr.forEach((item) => {
                obj[item[0]] = item[1];
            });

            return obj
    }
}
