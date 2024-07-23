

export const EmptyFavourites = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mt-6">
                No favourite boards!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Try making a board favourite.
            </p>
        </div>
    )
}