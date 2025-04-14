# SPM

## Start up Front End

### To start the Vue app

```
cd FrontEnd
npm i vite
npm run dev
```

## Start up Back End

### Activate python backend environment + Run the backend

**Step 1: Goes to root directory of backend**

```
cd BackEnd
```

**Step 2: Create virtual environment (only first time)**

```
python3 -m venv venv
```

**Step 3: Activate your environment (everytime)**

macOS/Linux:

```
source venv/bin/activate
```

Windows:

```
.\venv\Scripts\activate
```

**Step 4: Install Dependencies from requirements.txt (everytime to get latest dependency):**

```
pip install -r requirements.txt
```

Optional - To install new dependencies and update to requirements.txt (only when there is new dependency):

```
pip install <package-name>
pip freeze > requirements.txt
```

**Step 5: To run the backend (already in BackEnd folder)**

```
python run.py
```

**Step 6: To deactivate (when edits are finished):**

```
deactivate
```

## Git (dev -> test -> main)

### To promte changes to `test` branch from `dev` branch:

```
git push origin dev:test
```

** note that `git push` ***will overwrite*** the `test` branch with the `dev` branch

### To promte changes to `main` branch from `test` branch:

```
git push origin test:main
```

** note that `git push` ***will overwrite*** the `main` branch with the `test` branch

## To check for code coverage

**Step 1: Goes to root directory of backend**

```
cd BackEnd
```

**Step 2: Activate your environment (everytime)**

macOS/Linux:

```
source venv/bin/activate
```

Windows:

```
.\venv\Scripts\activate
```

**Step 3: Set Up Database**

```
Insert schemaTest.sql in your database

```

**Step 4: Change Config.py if required**

```
change the class Testconfig
        1. DB_USER
        2. DB_PASSWORD 
        3. DB_PORT 
        According
```

**Step 5: Run the following code to check for coverage**

```
coverage run --branch -m unittest discover -s tests

coverage report -m

coverage html

```

## To run specify test case

**Step 1: Goes to root directory of backend**

```
cd BackEnd
```

**Step 2: Activate your environment (everytime)**

macOS/Linux:

```
source venv/bin/activate
```

Windows:

```
.\venv\Scripts\activate
```

**Step 3: Run your test case**

```
python -m tests.{your_test_file_without_py}

```
