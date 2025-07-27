
using UnityEngine;
using PsLib;

public class PsManager : MonoBehaviour
{
    private Ps _inst;
    
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        // Get the instance of the pokemon showdown executor that we want to use.
        _inst = Ps.GetInstance();
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
