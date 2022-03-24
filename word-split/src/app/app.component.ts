import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'word-split';

  sentence: string[] = []
  resultedSentence: string = ''
  counter: number = 0

  dictionaryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dictionaryForm = this.initForm()
    this.addNewWord('')
  }

  initForm() : FormGroup {
    return this.fb.group({
      longString: '',
      dictionary: this.fb.array([]),
    });
  }


  get dictionary(): FormArray {
    return this.dictionaryForm.get("dictionary") as FormArray
  }

  get longString() {
    return this.dictionaryForm.get("longString")
  }


  newWord(value: string): FormGroup {
    return this.fb.group({
      word: value,
    })
  }

  addNewWord(value: string) {
    this.dictionary.push(this.newWord(value));
  }

  removeWordFromDictionary(i: number) {
    this.dictionary.removeAt(i);
  }



  setFoxExample() {
    this.dictionaryForm = this.initForm()
    const foxLongString: string = 'thequickbrownfox'
    const foxDictionary: string[] =  ['quick', 'brown', 'the', 'fox']

    this.longString?.setValue(foxLongString)
    foxDictionary.forEach(word => {
      this.addNewWord(word)
    });
  }

  setBedExample() {
    this.dictionaryForm = this.initForm()
    const bedLongString: string = 'bedbathandbeyond'
    const bedDictionary: string[] =  ['bed', 'bath', 'bedbath', 'and', 'beyond']

    this.longString?.setValue(bedLongString)
    bedDictionary.forEach(word => {
      this.addNewWord(word)
    });
  }

  resetValues() {
    this.sentence = []
    this.resultedSentence = ''
    this.counter = 0
  }

  longStringHasEmptySpace() {
    for (let index = 0; index <= this.longString?.value.length; index++) {
      let substr: string = this.longString?.value[index]
      if(substr == ' ') {
        return true
      }
    }
    return false
  }

  onSubmit() {
    if(this.longStringHasEmptySpace()) {
      window.alert('Error! Found at least one empty space in string!')
      return
    }
    
    this.resetValues()
    for (let index = 0; index <= this.longString?.value.length; index++) {
      let substr: string = this.longString?.value.substring(this.counter, index)
      this.dictionary.value.forEach((word: { word: string; }) => {
        if(word.word == substr) {
          this.sentence.push(substr)
          this.counter = index
        }
      });
    }
    this.setResultedSentence()
  }


  setResultedSentence() {
    if(this.checkValidity()) {
      this.sentence.forEach(word => {
        if(this.resultedSentence == '') this.resultedSentence += word
        else this.resultedSentence += ' ' + word
      });
    }
  }

  checkValidity() {
    let checkString: string = ''
    this.sentence.forEach(word => {
      checkString += word
    });
    if(checkString === this.longString?.value) {
      return true
    }
    return false
  }
}
