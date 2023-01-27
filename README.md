# Description
This is a very simple Chrome browser extension to highlight various Facebook accounts while scroolling on Facebook.  
Primary function is to serve as a black list.   
Although Facebook has a feature to block harmfull accounts, but sometimes this is not an option. If you need to make world better, you need to see what trolls or fake acounts are talking behind your back. So this will help to pop their comments to take your attention and remind you that this is potentionally harmful account.

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

# HOW TO RESET HISTORY
Deleting the .git folder may cause problems in your git repository. If you want to delete all your commit history but keep the code in its current state, it is very safe to do it as in the following:  
  - Checkout  
    - `git checkout --orphan latest_branch`
  - Add all the files
    - `git add -A`
  - Commit the changes
    - `git commit -am "commit message"`
  - Delete the branch
    - `git branch -D main`
  - Rename the current branch to main
    - `git branch -m main`
  - Finally, force update your repository
    - `git push -f origin main`
  
  
PS: this will not keep your old commit history around