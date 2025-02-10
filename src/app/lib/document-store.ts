import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'


//define the store
export const createStore = (docs: Document[]) =>
    MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())


// pdf loader
export const docsFromPDF = async (pdfPath: string) => {
    const loader = new PDFLoader(pdfPath)

    return loader.loadAndSplit(new CharacterTextSplitter({
        separator: '. ',
        chunkSize: 2500,
        chunkOverlap: 200,
      })
    )
}

//load store
export const loadStore = async (pdfPath: string) => {
    const pdfDocs = await docsFromPDF(pdfPath)

    return createStore(pdfDocs)
  }