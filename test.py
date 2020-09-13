from spacy import load
import sys

text = sys.argv[1]


def func(text):
    nlp = load('en_ner_bc5cdr_md')

    if text == "":
        return "Seems like some problem. Speak again."

    doc = nlp(text)

    extracted_ents = {
        'label': 'Diseases',
        'entities': doc.ents
    }

    return extracted_ents

print(func(text), flush = True)




