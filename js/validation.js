// 1. Метод enableValidation - будет находить все формы в документе на каждый submit вешать preventDefault()
//     а также пробегать по всем fieldSet и делать setEventListeners.

// 2. Метод setEventListeners - будет принимать formElement (fieldSet), находить в них инпуты, находить кнопку которая,
//     сабмитит форму, передавать список инпутов и кнопку в метод toggleButtonState(для первоначального определения сост.).
//     Далее пробегаться по по всем инпутам и и вешать на событе 'input' методы toggleButtonState и метод checkInputValidity.

// 3. Метод toggleButtonState вызывает метод hasInvalidInput, который принимает лист инпутов и если возвращает true,
//     то - дизейбл кнопки, если false - энейбл кнопки(модификатором button__inactive.

// 4. Метод hasInvalidInput возвращает фолс если в листе инпутов хотя бы один не проходит validity.valid. Если false,
//         то делает showInputError, если true - hideInputError.

// 5. Метод showInputError принимает элемент формы, элемент инпута и сообщение об ошибке. Далее ищем в formElement,
//         inputElement.id - error  - это будет errorElement. Далее в инпут элемент добавляем модификатор type_error.
//         В errorElement добавляется текст ошибки - errorText и ему класс form__input-error_active.

// 5. Метод hideInputError удаляются form__input_type_error из элемента инпута и form__input-error_active из элемента
//         ошибки и очищаем текст

const showInputError = (formElement, inputElement) => {
    let errorMessage;
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    if (inputElement.textContent.length === 0) {
        errorMessage = 'Вы пропустили это поле';
    }
    if (inputElement.validity.tooShort === true) {
        errorMessage = `Минимальное количество символов: 2. Длина текста сейчас: ${inputElement.value.length}`
    }
    if (inputElement.validity.typeMismatch === true && inputElement.classList.contains('popup__input_type_src')) {
        errorMessage = 'Введите адрес сайта';
    }
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement)
    } else {
        showInputError(formElement, inputElement)
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save_inactive');
  } else {
      buttonElement.classList.remove('popup__save_inactive');
  }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.closest('.popup__container').querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (e) => {
            toggleButtonState(inputList, buttonElement);
            checkInputValidity(formElement, inputElement)
        });
    })
}

const enableValidation = () => {
    const formsList = Array.from(document.querySelectorAll('.form'));
    formsList.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
        const fieldSetList = Array.from(form.querySelectorAll('.popup__input-form'));
        fieldSetList.forEach((fieldSet) => {
            setEventListeners(fieldSet)
        });
    });
};

enableValidation();