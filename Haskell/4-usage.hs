module Main where

import EnhancedEmitter

data Struct = Struct { a :: Int } deriving (Show)

application  = emitter
application' = onAny printAny . on "smth" printCertain $ application

main = mconcat . concat . map ($ application') $
        [ emit "smth" (Struct 5)
        , emit "smth2" (Struct 500)
        , emit "*" (Struct 700)
        ]

printCertain :: Show a => a -> IO ()
printCertain dat = do
  putStrLn "Certain event"
  print dat

printAny :: Show a => String -> a -> IO ()
printAny name dat = do
  putStrLn "Any event"
  print (name, dat)
