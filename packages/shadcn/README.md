# shadcn2

A CLI for adding components to your project.

## create

Use the `create` command to create a new project. You will be taken to a website to build your custom design system and choose your framework.

```bash
npx shadcn2 create
```

## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures Tailwind CSS, and CSS variables for the project.

```bash
npx shadcn2 init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx shadcn2 add [component]
```

### Example

```bash
npx shadcn2 add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx shadcn2 add
```

## Documentation

Visit https://shadcn2.yourdomain.com/docs/cli to view the documentation.

## License

Licensed under the [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).
