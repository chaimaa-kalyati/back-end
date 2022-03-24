'use strict';
const { faker } = require('@faker-js/faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersData = [];
     const roles = ['admin','author','guest']
     const categorieData = []
     const articleData = [] 
     const articleCategorieData = []
     const commentData = []
     const Date = faker.date.between(new Date(2000, 1, 1, 0, 0, 0),new Date())

     for (let i = 0; i < 10; i++) {
        const categorie = {
          id:(i+1),
          name:faker.lorem.sentence(3),
          createdAt:Date,
          updatedAt:Date
        }
        categorieData.push(categorie)
    }
    let articleId = 1
     for (let i = 0; i < 20; i++) {
         const user = {
             id:(i+1),
             username: faker.internet.userName(),
             email: faker.internet.email(),
             password:faker.internet.password(),
             role:faker.helpers.randomize(roles),
             createdAt:Date,
             updatedAt:Date
         }
         
         for(let k = 0;k<Math.floor(Math.random() * (10 - 2) + 2);k++){
            const articleDate = faker.date.between(date,new Date())
            const article = {
              id:articleId,
              userId:(i+1),
              title:faker.lorem.sentence(),
              content:faker.lorem.paragraphs(),
              createdAt:articleDate,
              updatedAt: articleDate
            }
            
            for(let l = 1;l<=Math.floor(Math.random() * (6 - 2) + 2);l++){
              const articleCategorie = {
                ArticleId:articleId,
                CategorieId:l,
                createdAt:articleDate,
                updatedAt:articleDate
              }
              articleCategoriesData.push(articleCategorie)
            }
            for(let c = 0;c<Math.floor(Math.random() * (10));c++){
              const commentDate = faker.date.between(articleDate,new Date())
              const comment = {
                content:faker.lorem.text(),
                ArticleId:articleId,
                createdAt:commentDate,
                updatedAt:commentDate
              }
              commentData.push(comment)
            }
            articleId++
            articleData.push(article)
         }

         usersData.push(user)
        }

        
   
         await queryInterface.bulkInsert('Users', usersData);
         await queryInterface.bulkInsert('Categories', categorieData);
         await queryInterface.bulkInsert('Articles', articleData);
         await queryInterface.bulkInsert('Commentaires', commentData);
        },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};