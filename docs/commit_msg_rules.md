# Commit messages

```
———————————————————————
type: Subject

body

footer
———————————————————————
```

## The Type

- ft: A new feature
- fix: A bug fix
- doc: Changes to documentation
- style: Formatting, missing semi colons, etc; no code change
- ref: Refactoring production code
- test: Adding tests, refactoring test; no production code change
- type: Adding/changing only types (e.g. getting rid of ‘any’), writing .d.ts files
- chore: Updating build tasks, package manager configs, etc; no production code change

## The Subject

Должен начинаться с прописной буквы и состоять не более, чем из 50 символов без точки в конце.
Пишется в императвном тоне: описывает, что коммит делает, а не что он сдлелал.

## The Body

Необязательное поле. Описывает что и почему сделано в этом кормите, но не то, как это было сделано. Отделено от Subject пустой строкой, строки следует ограничивать по длине до 72 символов.

## The Footer

Необязателен. Можно использовать для ссылок на номера Issue в трекере.

Номер задачи из бэклога по идее должен использоваться в названии ветки, в которой данная задача выполняется, поэтому, в commit-message мне он кажется лишним, ибо места там и так мало. Если все таки нужен, то можно его ставить в футер.
Предлагаю писать Subject по-английски, а Body можно и по-русски.

## Пример

```
feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```
