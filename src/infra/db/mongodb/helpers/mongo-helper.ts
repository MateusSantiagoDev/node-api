import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  Client: null as MongoClient,

  async connect (url: string) {
    this.Client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect () {
    await this.Client.close()
  },

  getCollection (name: string): Collection {
    return this.Client.db().collection(name)
  },

  mapper: (collection: any): any => {
    const { _id, ...collectionData } = collection
    return Object.assign({}, collectionData, { id: _id })
  }
}
