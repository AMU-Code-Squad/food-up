Your contributions are always welcome!

Please go through the active issues, before you plan to conribute.

# How to contribute

There are different ways to use git and GitHub. You might use a graphical user interface (GUI), which some IEDs already have included or the command line.  
In this tutorial we will try to keep stuff simple and therefore use the command line.

## Find an issue

While viewing the repository you can use the tap "Issues" to view and filter [open issues](https://github.com/AMU-Code-Squad/food-up/issues).  
There are some tags like "good first issue" or "beginner" that might be of special interest to you.

## (Optional) Announce your interest

To avoid confusion and duplicate work, it is **recommended** to state that you are going to try and solve an issue.
In open source projects it is seen as polite to then wait until somebody assigns the issue to you.

## Fork the repository

### Why should you fork the repository?
A fork of a repository is a copy that still remembers where it came from.
Advantages of this are:
- You can open your **own branches** separate from the forked (upstream) repository.
- You can easily keep your repository **up to date** by simply pulling changes from upstream.
- Once you have finished making the changes you want to make, **suggesting this changes** for the original is very easy.

Using forks and pull request makes developing with many contributors less complicated for everybody involved!

### How to fork the repository

As long as you are visiting the repository there is a button called "fork" on the top right of the page.  
By clicking it and confirming you can fork the repository.

***For the next steps you need to have git installed on your device. 
If you haven't already done that, [this page](https://git-scm.com/downloads) might help.***

## Clone your version of the repository

### Why do we clone the repository?

After forking a repository it still is not local on your device.  
For bringing the repository on your device you need to clone it.  

### How to clone

Go to your version of the repository, click on the "Code" button and choose one of three ways: HTTPS, ssh or GitHub Cli.
Copy the line beneath the method. 
For example: https://github.com/<your-profile-name>/food-up.git

Open a terminal and navigate to where you want to place the repository.  
Enter
`git clone <copied url>`

## Create a branch

**Working on branches helps keeping different versions of your code and different uncompleted features from becoming a big mess.
You ***never*** work directly on the main branch (sometimes also called master).**

Change to the repository directory on your computer (if you are not already there):

`cd food-up`

Now create a branch using the git checkout command:

`git checkout -b your-new-branch-name`

For example:

git checkout -b do-something

## Make necessary changes 

Do whatever you planned to do.

## Commit changes

### Adding files

For adding specific files:
`git add <filename>`

**Be sure only files you wish to add have been changed. Use `git status` to check.**

### Committing added files

Use  
`git commit -m "<commit message>"`
Your commit message should describe the changes you have made.

## Push changes to GitHub

To make your local changes visible for remote (so you can see and interact with them on GitHub) you need to push them.  

Push your changes using the command git push:

`git push origin <add-your-branch-name>`

## Create a pull request

In your repository on GitHub, you'll see a "Compare & pull request" button. Click on that button.

You will have the option to give some additional information to the changes your pull request is going to cause by entering text.
After you have done that, create the pull request by clicking on "Create pull request".

## Wait for review

Your reviewer might merge the request or ask for you to make some changes.  

***If there are some improvements you need to do, don't worry:***  
Everything you push on your branch will now be added to the pull request. (That is one of the reasons we need different branches for different issues!).
You can use the comments to ask for clarification if needed. As soon as the reviewer is happy, your changes will be merged.  
(Remember: your reviewer is a person who tries to work for the good of all. Don't ever be harsh with them, especially if they wish for multiple changes.)


# Happy Coding!
