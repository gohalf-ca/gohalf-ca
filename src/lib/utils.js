export function class_names(...classes) {
    return classes.filter(Boolean).join(" ");
}
