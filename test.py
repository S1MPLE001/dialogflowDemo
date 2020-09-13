from spacy import load
# from pprint import pprint
# import 
# import en_ner_bc5cdr_md
nlp = load('en_ner_bc5cdr_md')

text = '''Myeloid derived suppressor cells (MDSC) are immature 
          myeloid cells with immunosuppressive activity. 
          They accumulate in tumor-bearing mice and humans 
          with different types of cancer, including hepatocellular 
          carcinoma (HCC).'''

doc = nlp(text)
# print(doc.ents)

extracted_ents = {
    'label': 'Diseases',
    'entities': doc.ents
}

print(extracted_ents)