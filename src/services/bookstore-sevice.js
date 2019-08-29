
export default class BookstoreService {
  data = [
    {
      id: 1,
      title: 'Code: The Hidden Language of Computer Hardware and Software',
      author: 'harles Petzold',
      price: 45,
      coverImage:
        'https://images-na.ssl-images-amazon.com/images/I/313vXSokMiL._SX330_BO1,204,203,200_.jpg'
    },
    {
      id: 2,
      title: 'Grokking Algorithms: An illustrated guide for programmers',
      author: 'Aditya Bhargava',
      price: 105,
      coverImage:
        'https://images-na.ssl-images-amazon.com/images/I/61uUPXbhMxL._SX397_BO1,204,203,200_.jpg'
    }
  ];
  getBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data)
      }, 800);
    })
  }
}